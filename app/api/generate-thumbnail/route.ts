import { db } from "@/configs/db";
import { aiThumbnail } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const content = formData.get("content");
    const referenceImage = formData.get("referenceImage") as File | null;
    const faceImage = formData.get("faceImage") as File | null;

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
      referenceImage: referenceImage
        ? await getFileBufferData(referenceImage)
        : null,
      faceImage: faceImage ? await getFileBufferData(faceImage) : null,
      userEmail: user.primaryEmailAddress.emailAddress,
    };

    const result = await inngest.send({
      name: "ai/generate-thumbnail",
      data: inputData,
    });

    return NextResponse.json({
      message: "Thumbnail generation started successfully",
      data: {
        runId: result?.ids?.[0] || result?.ids,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to start thumbnail generation",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

const getFileBufferData = async (file: File) => {
  try {

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

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    const result = await db
      .select()
      .from(aiThumbnail)
      .where(
        eq(aiThumbnail.userEmail, user?.primaryEmailAddress?.emailAddress || "")
      ).orderBy(desc(aiThumbnail.createdAt));
    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ Error fetching thumbnails:", error);
    return NextResponse.json(
      { error: "Failed to fetch thumbnails" },
      { status: 500 }
    );
  }
}
