import { db } from "@/configs/db";
import { aiContent } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();

    const user = await currentUser();

    const result = await inngest.send({
      name: "ai/generate-content",
      data: {
        title,
        userEmail: user?.primaryEmailAddress?.emailAddress || null,
      },
    });

    return NextResponse.json({ runId: result?.ids?.[0] || result?.ids });
  } catch (error) {
    console.error("Error generating AI content:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();

    const result = await db
      .select()
      .from(aiContent)
      .where(
        eq(aiContent.userEmail, user?.primaryEmailAddress?.emailAddress || "")
      )
      .orderBy(desc(aiContent.createdAt));

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error("Error fetching AI content:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}