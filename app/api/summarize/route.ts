import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Note } from "@/models/Note";

export async function POST(request: Request) {
  await connectDB();

  const body = await request.json();
  const { id, text } = body;

  if (!id || !text) {
    return NextResponse.json(
      { error: "ID and text are required" },
      { status: 400 }
    );
  }

  const words = text.split(" ");
  const summary = words.slice(0, 5).join(" ") + "...";

  const updatedNote = await Note.findByIdAndUpdate(
    id,
    { summary },
    { new: true }
  );

  return NextResponse.json(updatedNote);
}
