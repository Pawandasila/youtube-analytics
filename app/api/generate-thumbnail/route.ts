import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse , NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const content = formData.get("content");
  const referenceImage = formData.get("referenceImage") as File | null;
  const faceImage = formData.get("faceImage") as File | null;


  const user = await currentUser();

  const inputData = {
    content: content ? content.toString() : "",
    referenceImage: referenceImage ? await getFileBufferData(referenceImage) : null,
    faceImage: faceImage ? await getFileBufferData(faceImage) : null,
    userEmail: user?.primaryEmailAddress?.emailAddress || null,
  };

  const result = await inngest.send({
    name: "ai/generate-thumbnail",
    data: inputData,
  });



  return NextResponse.json({ message: "Thumbnail generated successfully" , data : result });
}


const getFileBufferData = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(buffer);

  return {
    name: file.name,
    type: file.type,
    size : file.size,
    lastModified: file.lastModified,    
    buffer: fileBuffer.toString("base64"),
  }
}