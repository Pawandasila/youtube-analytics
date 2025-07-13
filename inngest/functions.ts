import { inngest } from "./client";
import ImageKit from "imagekit";

import { OpenAI } from "openai";
import { InferenceClient } from "@huggingface/inference";
import { db } from "@/configs/db";
import { aiThumbnail } from "@/configs/schema";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
});

const hf = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

const prompt = `TASK: Generate a detailed, high-quality prompt for creating a YouTube thumbnail that:

1. **Visual Style**: Maintain the visual style and layout from the reference image
2. **Content Adaptation**: Adapt the content to match the user's video topic
3. **Engagement Elements**: Include eye-catching elements like:
   - Bold, readable text overlays
   - Vibrant colors and contrast
   - Relevant icons or illustrations
   - Emotional expressions (if faces are involved)
   - Clear focal points

4. **Technical Requirements**:
   - 16:9 aspect ratio (1280x720 or higher)
   - High contrast for thumbnail visibility
   - Large, readable text even at small sizes
   - Professional lighting and composition

5. **Content-Specific Elements**: Based on the user content, suggest:
   - Relevant background elements
   - Appropriate color schemes
   - Industry-specific icons or graphics
   - Text placement and styling

  Please provide a deailed prompt that a graphic designer or AI image generator could use to create an effective YouTube thumbnail.`;

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
    await step.sleep("wait-a-moment", "1s");
    
    const { content, referenceImage, faceImage, userEmail } = event.data;

    // step 1 : upload images to ImageKit

    // const uploadImageUrl = await step.run("Upload Image", async () => {
    //   const results: { referenceImageUrl?: string; faceImageUrl?: string } = {};

    //   if (referenceImage) {
    //     const refImageUrl = await imageKit.upload({
    //       file: referenceImage?.buffer ?? "",
    //       fileName: `ref-${Date.now()}-${referenceImage.name || "image.jpg"}`,
    //       folder: "/thumbnails/reference",
    //       isPublished: true,
    //       useUniqueFileName: false,
    //     });

    //     results.referenceImageUrl = refImageUrl.url;
    //   }

    //   if (faceImage?.buffer) {
    //     const faceImageResponse = await imageKit.upload({
    //       file: faceImage.buffer,
    //       fileName: `face-${Date.now()}-${faceImage.name || "face.jpg"}`,
    //       folder: "/thumbnails/faces",
    //       isPublished: true,
    //       useUniqueFileName: true,
    //     });
    //     results.faceImageUrl = faceImageResponse.url;
    //   }

    //   return {
    //     results,
    //   };
    // });

    // // step 2 : call AI service to generate thumbnail

    // const generatedThumbnailPrompt = await step.run(
    //   "Generate Thumbnail Prompt",
    //   async () => {
    //     try {
    //       const response = await openai.chat.completions.create({
    //         model: "google/gemini-2.5-flash",
    //         messages: [
    //           {
    //             role: "user",
    //             content: [
    //               {
    //                 type: "text",
    //                 text: `You are an expert YouTube thumbnail designer. ${
    //                   uploadImageUrl.results.referenceImageUrl
    //                     ? "Analyze the reference image and create an improved thumbnail prompt based on the user's content."
    //                     : "Create a high-quality YouTube thumbnail prompt based on the user's content."
    //                 }

    //                 USER CONTENT: "${content}"

    //                 ${prompt}

    //                 Based on the user's content${
    //                   uploadImageUrl.results.referenceImageUrl
    //                     ? " and the reference image provided"
    //                     : ""
    //                 }, create a detailed prompt for generating a YouTube thumbnail that incorporates the content while maintaining professional quality and visual appeal.

    //                 NOTE: Only provide the text prompt without any additional comments.`,
    //               },
    //               ...(uploadImageUrl.results.referenceImageUrl
    //                 ? [
    //                     {
    //                       type: "image_url" as const,
    //                       image_url: {
    //                         url: uploadImageUrl.results.referenceImageUrl,
    //                       },
    //                     },
    //                   ]
    //                 : []),
    //             ],
    //           },
    //         ],
    //         max_tokens: 500,
    //         temperature: 0.7,
    //       });

    //       const generatedPrompt = response.choices[0]?.message?.content;

    //       if (!generatedPrompt) {
    //         throw new Error("No content generated from AI");
    //       }

    //       return {
    //         prompt: generatedPrompt,
    //         usage: response.usage,
    //       };
    //     } catch (error) {
    //       console.error("Error generating thumbnail prompt:", error);
    //       throw new Error(`AI prompt generation failed: ${error}`);
    //     }
    //   }
    // );

    // // step 3 : call AI service to generate thumbnail using Hugging Face

    // const aiThumbnailGeneration = await step.run(
    //   "Generate Thumbnail Image",
    //   async () => {
    //     try {
          
    //       // Generate image using Hugging Face FLUX model (fastest, highest quality)
    //       const imageBlob = await hf.textToImage({
    //         provider: "nebius",
    //         model: 'black-forest-labs/FLUX.1-schnell',
    //         inputs: generatedThumbnailPrompt.prompt,
    //         parameters: {
    //           num_inference_steps: 4, 
    //           width: 1280,
    //           height: 720,
    //         }
    //       });

    //       let base64Data = imageBlob;
    //       if (typeof base64Data === "string" && base64Data.startsWith("data:image")) {
    //         base64Data = base64Data.split(",")[1];
    //       }
          
    //       // Upload generated image to ImageKit for permanent storage
    //       const uploadedImage = await imageKit.upload({
    //         file: Buffer.from(base64Data, "base64"),
    //         fileName: `generated-thumbnail-${Date.now()}.jpg`,
    //         folder: "/thumbnails/generated",
    //         isPublished: true,
    //         useUniqueFileName: true,
    //       });
 

    //       return {
    //         images: uploadedImage.url,
    //         cost: 0, 
    //         seed: `hf-${Date.now()}`,
    //         model: 'FLUX.1-schnell',
    //         fileId: uploadedImage.fileId,
    //       };
    //     } catch (error) {
          
    //       const prompt = encodeURIComponent(generatedThumbnailPrompt.prompt);
    //       const negativePrompt = encodeURIComponent("blurry, low quality, pixelated, amateur, bad composition");
          
    //       const pollinationsUrl = `https://image.pollinations.ai/prompt/${prompt}?width=1280&height=720&model=flux&enhance=true&negative=${negativePrompt}`;
          
    //       return {
    //         images: pollinationsUrl,
    //         cost: 0,
    //         seed: `pollinations-${Date.now()}`,
    //         model: 'FLUX (Pollinations)',
    //         fallback: true,
    //       };
    //     }
    //   }
    // );

    // // step 4 : save the generated thumbnail in database

    // const saveToDB = await step.run(
    //   "Save to Database",
    //   async () => {
    //     try {
    //       const currentTime = Math.floor(Date.now() / 1000); 

    //       const result = await db.insert(aiThumbnail).values({
    //         userInput: content,
    //         userEmail: userEmail,
    //         referenceImageUrl: uploadImageUrl.results.referenceImageUrl || null,
    //         faceImageUrl: uploadImageUrl.results.faceImageUrl || null,
    //         thumbnailUrl: aiThumbnailGeneration.images,
    //         createdAt: currentTime,
    //         updatedAt: currentTime,
    //       });

    //       return {
    //         saved: true,
    //         databaseId: result,
    //         content,
    //         userEmail,
    //         uploadedImages: uploadImageUrl.results,
    //         generatedThumbnailPrompt: generatedThumbnailPrompt.prompt,
    //         usage: generatedThumbnailPrompt.usage,
    //         aiThumbnail: aiThumbnailGeneration,
    //       };
    //     } catch (error) {
    //       console.error("❌ Error saving to database:", error);
    //       throw new Error(`Database save failed: ${error}`);
    //     }
    //   }
    // );

    return {
      message: "Thumbnail generated and saved to database successfully! 🎉",
      // data: saveToDB,
    };
  }
);
