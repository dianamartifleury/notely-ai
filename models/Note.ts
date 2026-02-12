import mongoose, { Schema } from "mongoose";

const NoteSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "general",
  },
  summary: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Note =
  mongoose.models.Note || mongoose.model("Note", NoteSchema);

