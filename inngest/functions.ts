import { inngest } from "./client";
import ImageKit from "imagekit";

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
    const { content, referenceImage, faceImage, userEmail } = event.data;

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
        results
      };
    });

    return {
      message: "Thumbnail generated successfully",
      data: { content, referenceImage, faceImage, userEmail, uploadImageUrl },
    };
  }
);
