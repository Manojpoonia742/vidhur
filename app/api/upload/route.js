import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();

  const text = formData.get("text");
  const files = formData.getAll("files"); // array of File objects

  console.log("Text:", text);
  console.log("Files:", files);

  // TODO: save files to Cloudinary, S3, or database
  return NextResponse.json({ success: true });
}
