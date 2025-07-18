import { inngest } from "./client";
import ImageKit from "imagekit";

import { OpenAI } from "openai";
import { InferenceClient } from "@huggingface/inference";
import { db } from "@/configs/db";
import { aiThumbnail, aiContent } from "@/configs/schema";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
});

const hf = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

const prompt = `TASK: Generate a detailed, high-quality prompt for creating a YouTube thumbnail that:

1. **Visual Style**: Maintain the visual style and layout from the reference image (if provided)
2. **Content Adaptation**: Adapt the content to match the user's video topic
3. **Face Integration**: If a face image is provided, prominently feature this specific person's face in the thumbnail with:
   - Clear visibility and good lighting
   - Appropriate facial expression for the content
   - Professional positioning and framing
   - Natural integration with the overall design
4. **Engagement Elements**: Include eye-catching elements like:
   - Bold, readable text overlays
   - Vibrant colors and contrast
   - Relevant icons or illustrations
   - Emotional expressions (especially if faces are involved)
   - Clear focal points

5. **Technical Requirements**:
   - 16:9 aspect ratio (1280x720 or higher)
   - High contrast for thumbnail visibility
   - Large, readable text even at small sizes
   - Professional lighting and composition

6. **Content-Specific Elements**: Based on the user content, suggest:
   - Relevant background elements
   - Appropriate color schemes
   - Industry-specific icons or graphics
   - Text placement and styling

  Please provide a detailed prompt that a graphic designer or AI image generator could use to create an effective YouTube thumbnail.`;

const aiContentPrompt = `You are an expert YouTube SEO strategist and AI creative assistant. Based on the user input below, generate a JSON response only (no explanation, no markdown, no commentary), containing:

1. Three YouTube video titles optimized for SEO
2. SEO Score for each title (1 to 100)
3. A compelling YouTube video description based on the topic
4. 10 relevant YouTube video tags
5. Four YouTube thumbnail image prompts, each including:
   • Professional illustration style based on the video title
   • A short 3-5 word heading that will appear on the thumbnail image
   • Visually compelling layout concept to grab attention
   • Different visual styles (3D, flat, vector, realistic) for variety

User Input: {user_input}

Return format (JSON only):
{
  "titles": [
    {
      "title": "Title 1",
      "seo_score": 87
    },
    {
      "title": "Title 2", 
      "seo_score": 82
    },
    {
      "title": "Title 3",
      "seo_score": 78
    }
  ],
  "description": "Write a professional and engaging YouTube video description here based on the input.",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8", "tag9", "tag10"],
  "thumbnail_prompts": [
    {
      "heading": "Heading Text 1",
      "prompt": "Professional 3D illustration for thumbnail image based on Title 1. Include elements such as..."
    },
    {
      "heading": "Heading Text 2", 
      "prompt": "Modern flat design illustration for thumbnail image based on Title 2. Include elements such as..."
    },
    {
      "heading": "Heading Text 3",
      "prompt": "Vector art style illustration for thumbnail image based on Title 3. Include elements such as..."
    },
    {
      "heading": "Heading Text 4",
      "prompt": "Realistic photographic style illustration for thumbnail image based on the topic. Include elements such as..."
    }
  ]
}

Make sure each thumbnail image prompt reflects different visual styles (3D, flat, vector, realistic), includes the respective title context, character/action/objects (if needed), background design, and text position ideas for maximum variety and appeal.`;


  
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
});

export const generateAiThumbnail = inngest.createFunction(
  { id: "ai/generate-thumbnail" },
  { event: "ai/generate-thumbnail" },
  async ({ event, step }) => {
    // await step.sleep("wait-a-moment", "7s");
    
    const { content, referenceImage, faceImage, userEmail } = event.data;
    // return "success"

    // step 1 : upload images to ImageKit

    const uploadImageUrl = await step.run("Upload Image", async () => {
      const results: { referenceImageUrl?: string; faceImageUrl?: string } = {};

      if (referenceImage) {
        const refImageUrl = await imageKit.upload({
          file: referenceImage?.buffer ?? "",
          fileName: `ref-${Date.now()}-${referenceImage.name || "image.jpg"}`,
          folder: "/thumbnails/reference",
          isPublished: true,
          useUniqueFileName: false,
        });

        results.referenceImageUrl = refImageUrl.url;
      }

      if (faceImage?.buffer) {
        const faceImageResponse = await imageKit.upload({
          file: faceImage.buffer,
          fileName: `face-${Date.now()}-${faceImage.name || "face.jpg"}`,
          folder: "/thumbnails/faces",
          isPublished: true,
          useUniqueFileName: true,
        });
        results.faceImageUrl = faceImageResponse.url;
      }

      return {
        results,
      };
    });

    // step 2 : call AI service to generate thumbnail

    const generatedThumbnailPrompt = await step.run(
      "Generate Thumbnail Prompt",
      async () => {
        try {
          const response = await openai.chat.completions.create({
            model: "google/gemini-2.5-flash",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: `You are an expert YouTube thumbnail designer. ${
                      uploadImageUrl.results.referenceImageUrl
                        ? "Analyze the reference image and create an improved thumbnail prompt based on the user's content."
                        : "Create a high-quality YouTube thumbnail prompt based on the user's content."
                    }

                    USER CONTENT: "${content}"

                    ${prompt}

                    ${
                      uploadImageUrl.results.faceImageUrl
                        ? `IMPORTANT: A face image has been provided. You MUST include instructions to use this specific person's face in the thumbnail. The face should be prominently featured and clearly visible in the generated thumbnail.`
                        : ""
                    }

                    Based on the user's content${
                      uploadImageUrl.results.referenceImageUrl
                        ? " and the reference image provided"
                        : ""
                    }${
                      uploadImageUrl.results.faceImageUrl
                        ? " and the face image that should be featured prominently"
                        : ""
                    }, create a detailed prompt for generating a YouTube thumbnail that incorporates the content while maintaining professional quality and visual appeal.

                    NOTE: Only provide the text prompt without any additional comments.`,
                  },
                  ...(uploadImageUrl.results.referenceImageUrl
                    ? [
                        {
                          type: "image_url" as const,
                          image_url: {
                            url: uploadImageUrl.results.referenceImageUrl,
                          },
                        },
                      ]
                    : []),
                  ...(uploadImageUrl.results.faceImageUrl
                    ? [
                        {
                          type: "image_url" as const,
                          image_url: {
                            url: uploadImageUrl.results.faceImageUrl,
                          },
                        },
                      ]
                    : []),
                ],
              },
            ],
            max_tokens: 500,
            temperature: 0.7,
          });

          const generatedPrompt = response.choices[0]?.message?.content;

          if (!generatedPrompt) {
            throw new Error("No content generated from AI");
          }

          return {
            prompt: generatedPrompt,
            usage: response.usage,
          };
        } catch (error) {
          console.error("Error generating thumbnail prompt:", error);
          throw new Error(`AI prompt generation failed: ${error}`);
        }
      }
    );

    // step 3 : call AI service to generate thumbnail using Hugging Face

    const aiThumbnailGeneration = await step.run(
      "Generate Thumbnail Image",
      async () => {
        try {
          
          // Generate image using Hugging Face FLUX model (fastest, highest quality)
          const imageBlob = await hf.textToImage({
            provider: "nebius",
            model: 'black-forest-labs/FLUX.1-schnell',
            inputs: generatedThumbnailPrompt.prompt,
            parameters: {
              num_inference_steps: 4, 
              width: 1280,
              height: 720,
            }
          });

          let base64Data = imageBlob;
          if (typeof base64Data === "string" && base64Data.startsWith("data:image")) {
            base64Data = base64Data.split(",")[1];
          }
          
          // Upload generated image to ImageKit for permanent storage
          const uploadedImage = await imageKit.upload({
            file: Buffer.from(base64Data, "base64"),
            fileName: `generated-thumbnail-${Date.now()}.jpg`,
            folder: "/thumbnails/generated",
            isPublished: true,
            useUniqueFileName: true,
          });
 

          return {
            images: uploadedImage.url,
            cost: 0, 
            seed: `hf-${Date.now()}`,
            model: 'FLUX.1-schnell',
            fileId: uploadedImage.fileId,
          };
        } catch (error) {
          
          const prompt = encodeURIComponent(generatedThumbnailPrompt.prompt);
          const negativePrompt = encodeURIComponent("blurry, low quality, pixelated, amateur, bad composition");
          
          const pollinationsUrl = `https://image.pollinations.ai/prompt/${prompt}?width=1280&height=720&model=flux&enhance=true&negative=${negativePrompt}`;
          
          return {
            images: pollinationsUrl,
            cost: 0,
            seed: `pollinations-${Date.now()}`,
            model: 'FLUX (Pollinations)',
            fallback: true,
          };
        }
      }
    );

    // step 4 : save the generated thumbnail in database

    const saveToDB = await step.run(
      "Save to Database",
      async () => {
        try {
          const currentTime = Math.floor(Date.now() / 1000); 

          const result = await db.insert(aiThumbnail).values({
            userInput: content,
            userEmail: userEmail,
            referenceImageUrl: uploadImageUrl.results.referenceImageUrl || null,
            faceImageUrl: uploadImageUrl.results.faceImageUrl || null,
            thumbnailUrl: aiThumbnailGeneration.images,
            createdAt: currentTime,
            updatedAt: currentTime,
            //@ts-ignore
          }).returning(aiThumbnail)

          return {result};
        } catch (error) {
          console.error("❌ Error saving to database:", error);
          throw new Error(`Database save failed: ${error}`);
        }
      }
    );

    return {
      message: "Thumbnail generated and saved to database successfully! 🎉",
      data: saveToDB,
    };
  }
);

export const GenerateAiContent = inngest.createFunction(
  {id : "ai/generate-content"},
  {event: "ai/generate-content"},
  async ({event, step}) => {
    const { content, title, userEmail } = event.data;
    const userInput = title || content;
    
    // to generate title description , tags and thumbnail prompt
    const generateAiContent = await step.run(
      "Generate AI Content",
    async()=>{
       const completion = await openai.chat.completions.create({
        model: "google/gemini-2.0-flash-001",
        messages: [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": aiContentPrompt.replace("{user_input}", userInput)
              }
            ]
          }
        ],
      });


      const rawJson = completion.choices[0]?.message?.content;
      const parsedJson = rawJson?.replace(/```json/g, "").replace(/```/g, "").trim();
      const jsonData = JSON.parse(parsedJson || "{}");

      return jsonData;
    })


    // to generate thumbnail images based on the AI content prompts
    const generateThumbnails = await step.run(
      "Generate Thumbnail Images",
      async () => {
        try {
          const thumbnails = [];
          
          for (const [index, thumbnailPrompt] of generateAiContent.thumbnail_prompts.entries()) {
            try {
              const imageBlob = await hf.textToImage({
                provider: "nebius",
                model: 'black-forest-labs/FLUX.1-schnell',
                inputs: thumbnailPrompt.prompt,
                parameters: {
                  num_inference_steps: 4, 
                  width: 1280,
                  height: 720,
                }
              });

              let base64Data = imageBlob;
              if (typeof base64Data === "string" && base64Data.startsWith("data:image")) {
                base64Data = base64Data.split(",")[1];
              }
              
              // Upload generated image to ImageKit
              const uploadedImage = await imageKit.upload({
                file: Buffer.from(base64Data, "base64"),
                fileName: `ai-content-thumbnail-${index + 1}-${Date.now()}.jpg`,
                folder: "/thumbnails/ai-content",
                isPublished: true,
                useUniqueFileName: true,
              });

              thumbnails.push({
                heading: thumbnailPrompt.heading,
                url: uploadedImage.url,
                fileId: uploadedImage.fileId,
                prompt: thumbnailPrompt.prompt
              });
            } catch (error) {
              console.error(`Error generating thumbnail ${index + 1}:`, error);
              const encodedPrompt = encodeURIComponent(thumbnailPrompt.prompt);
              const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1280&height=720&model=flux&enhance=true`;
              
              thumbnails.push({
                heading: thumbnailPrompt.heading,
                url: pollinationsUrl,
                fallback: true,
                prompt: thumbnailPrompt.prompt
              });
            }
          }

          return thumbnails;
        } catch (error) {
          console.error("Error generating thumbnails:", error);
          throw new Error(`Thumbnail generation failed: ${error}`);
        }
      }
    );


    // to save to database
    const saveToDB = await step.run(
      "Save to Database",
      async () => {
        try {
          const currentTime = Math.floor(Date.now() / 1000);

          const result = await db.insert(aiContent).values({
            userInput: userInput,
            title: JSON.stringify(generateAiContent.titles),
            description: generateAiContent.description,
            tags: JSON.stringify(generateAiContent.tags),
            thumbnails: JSON.stringify(generateThumbnails),
            userEmail: userEmail,
            createdAt: currentTime,
            updatedAt: currentTime,
            //@ts-ignore
          }).returning(aiContent);

          return { result };
        } catch (error) {
          console.error("❌ Error saving to database:", error);
          throw new Error(`Database save failed: ${error}`);
        }
      }
    );

    return {
      message: "AI content generated successfully! 🎉",
      data: {
        database: saveToDB,
      },
    };
  }
);

export const getTrendingKeywords = inngest.createFunction(
  {id: "ai/get-trending-keywords"},
  { event: "ai/get-trending-keywords" },
  async ({ event, step }) => {
    // get google search trends using brightdata

    const googleSearch = await step.run('google-search-trends', async () => {
      
    })

    // get youtube search trends using youtube api

    // ai model for keyword suggestions

    // save to database
  }
)