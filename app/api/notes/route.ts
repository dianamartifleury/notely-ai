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

export async function PUT(request: Request) {
  await connectDB();

  const body = await request.json();
  const { id, text, category } = body;

  if (!id) {
    return NextResponse.json(
      { error: "ID is required" },
      { status: 400 }
    );
  }

  const updatedNote = await Note.findByIdAndUpdate(
    id,
    { text, category },
    { new: true }
  );

  if (!updatedNote) {
    return NextResponse.json(
      { error: "Note not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(updatedNote);
}
