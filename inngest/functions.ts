import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const generateAiThumbnail = inngest.createFunction(
  { id: "ai/generate-thumbnail" },
  { event: "ai/generate-thumbnail" },
  async ({ event, step }) => {
    const { content, referenceImage, faceImage, userEmail } = event.data;

    // Call your thumbnail generation logic here
    // For example:
    // const thumbnail = await generateThumbnail(content, referenceImage, faceImage, userEmail);

    return { message: "Thumbnail generated successfully", data: { content, referenceImage, faceImage, userEmail } };
  },
);