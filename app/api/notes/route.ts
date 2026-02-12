import { connectDB } from "@/lib/mongodb";
import { Note } from "@/models/Note";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const notes = await Note.find().sort({ createdAt: -1 });
  return NextResponse.json(notes);
}

export async function POST(request: Request) {
  await connectDB();

  const body = await request.json();

  if (!body.text) {
    return NextResponse.json(
      { error: "Text is required" },
      { status: 400 }
    );
  }

  const newNote = await Note.create({
    text: body.text,
    category: body.category || "general",
  });

  return NextResponse.json(newNote);
}

export async function DELETE(request: Request) {
  await connectDB();

  const body = await request.json();

  await Note.findByIdAndDelete(body.id);

  return NextResponse.json({ message: "Note deleted" });
}

