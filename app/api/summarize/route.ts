import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Note } from "@/models/Note";

// GET
export async function GET() {
  await connectDB();
  const notes = await Note.find().sort({ createdAt: -1 });
  return NextResponse.json(notes);
}

// POST
export async function POST(request: Request) {
  await connectDB();

  const body = await request.json();
  const { text, category } = body;

  const newNote = await Note.create({
    text,
    category,
  });

  return NextResponse.json(newNote);
}

// DELETE
export async function DELETE(request: Request) {
  await connectDB();

  const body = await request.json();
  const { id } = body;

  await Note.findByIdAndDelete(id);

  return NextResponse.json({ message: "Deleted" });
}

// PUT (EDIT)
export async function PUT(request: Request) {
  await connectDB();

  const body = await request.json();
  const { id, text, category } = body;

  const updatedNote = await Note.findByIdAndUpdate(
    id,
    { text, category },
    { new: true }
  );

  return NextResponse.json(updatedNote);
}
