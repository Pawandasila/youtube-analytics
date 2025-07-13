import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse , NextRequest } from "next/server";

/**
 * Handles POST requests to initiate AI-powered thumbnail generation.
 *
 * Extracts content and optional image files from the form data, validates user authentication and input, processes images, and sends a thumbnail generation event to an external service. Returns a JSON response indicating success with event run IDs, or an error response if validation or processing fails.
 */
export async function POST(req: NextRequest) {
  try {
    console.log("🚀 Starting thumbnail generation API...");
    
    const formData = await req.formData();
    const content = formData.get("content");
    const referenceImage = formData.get("referenceImage") as File | null;
    const faceImage = formData.get("faceImage") as File | null;

    console.log("📝 Content:", content);
    console.log("🖼️ Reference Image:", referenceImage?.name || "None");
    console.log("👤 Face Image:", faceImage?.name || "None");

    const user = await currentUser();
    
    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: "User authentication required" },
        { status: 401 }
      );
    }

    if (!content || content.toString().trim().length === 0) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const inputData = {
      content: content.toString(),
      referenceImage: referenceImage ? await getFileBufferData(referenceImage) : null,
      faceImage: faceImage ? await getFileBufferData(faceImage) : null,
      userEmail: user.primaryEmailAddress.emailAddress,
    };

    console.log("📤 Sending to Inngest...");
    
    const result = await inngest.send({
      name: "ai/generate-thumbnail",
      data: inputData,
    });

    console.log("✅ Inngest result:", result);

    return NextResponse.json({ 
      message: "Thumbnail generation started successfully", 
      data: { 
        runId: result?.ids?.[0] || result?.ids,
        ids: result?.ids 
      } 
    });
    
  } catch (error) {
    console.error("❌ API Error:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to start thumbnail generation",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}


const getFileBufferData = async (file: File) => {
  try {
    console.log(`📁 Processing file: ${file.name} (${file.size} bytes)`);
    
    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    return {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,    
      buffer: fileBuffer.toString("base64"),
    };
  } catch (error) {
    console.error("❌ Error processing file:", error);
    throw new Error(`Failed to process file ${file.name}: ${error}`);
  }
};