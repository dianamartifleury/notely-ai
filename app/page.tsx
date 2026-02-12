"use client";


import { useEffect, useState } from "react";

type Note = {
  _id: string;
  text: string;
  category: string;
  summary?: string;
};

export default function Home() {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
const [search, setSearch] = useState("");
const [adding, setAdding] = useState(false);
const [deletingId, setDeletingId] = useState<string | null>(null);
const [summarizingId, setSummarizingId] = useState<string | null>(null);
const [selectedCategory, setSelectedCategory] = useState("all");
const categories = Array.from(
  new Set(notes.map((note) => note.category))
);

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
  async function fetchNotes() {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  }

async function createNote() {
  if (!text) return;

  setAdding(true);

  const start = Date.now();

  await fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, category }),
  });

  await fetchNotes();

  const elapsed = Date.now() - start;

  if (elapsed < 1000) {
    await delay(1000 - elapsed);
  }

  setText("");
  setCategory("");
  setAdding(false);
}


  async function summarizeNote(note: Note) {
  setSummarizingId(note._id);

  const start = Date.now();

  const res = await fetch("/api/summarize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: note._id,
      text: note.text,
    }),
  });

  const updatedNote = await res.json();

  setNotes((prev) =>
    prev.map((n) =>
      n._id === updatedNote._id ? updatedNote : n
    )
  );

  const elapsed = Date.now() - start;

  if (elapsed < 1000) {
    await delay(1000 - elapsed);
  }

  setSummarizingId(null);
}



    async function deleteNote(id: string) {
  const confirmed = confirm("Are you sure you want to delete this note?");
  if (!confirmed) return;

  setDeletingId(id);

  const start = Date.now();

  await fetch("/api/notes", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  await fetchNotes();

  const elapsed = Date.now() - start;

  if (elapsed < 1000) {
    await delay(1000 - elapsed);
  }

  setDeletingId(null);
}



  useEffect(() => {
    fetchNotes();
  }, []);

  return (
  <main
    style={{
      minHeight: "100vh",
      background: "#f4f6f8",
      display: "flex",
      justifyContent: "center",
      padding: "40px",
      fontFamily: "system-ui, sans-serif",
    }}
  >
    <div
      style={{
        width: "600px",
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Notely AI</h1>

      <input
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ddd",
        }}
      />
      <select
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    marginBottom: "20px",
  }}
>
  <option value="all">All Categories</option>
  {categories.map((cat) => (
    <option key={cat} value={cat}>
      {cat}
    </option>
  ))}
</select>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          placeholder="Write your note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            flex: 2,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ddd",
          }}
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ddd",
          }}
        />
      </div>

     <button
  onClick={createNote}
  style={{
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#111",
    color: "white",
    cursor: "pointer",
    marginBottom: "20px",
    transition: "all 0.2s ease",
  }}
>
  {adding ? "Adding..." : "Add Note"}
</button>

{notes.length === 0 && (
  <div
    style={{
      padding: "30px",
      textAlign: "center",
      color: "#888",
      background: "#f9fafb",
      borderRadius: "8px",
      marginTop: "20px",
    }}
  >
    <p style={{ fontSize: "18px", marginBottom: "10px" }}>
      No notes yet
    </p>
    <small>Start by creating your first note 🚀</small>
  </div>
)}



      {notes
  .filter((note) =>
    note.text.toLowerCase().includes(search.toLowerCase())
  )
  .filter((note) =>
    selectedCategory === "all"
      ? true
      : note.category === selectedCategory
  )

        .map((note) => (
          <div
            key={note._id}
            style={{
              padding: "15px",
              borderRadius: "8px",
              background: "#f9fafb",
              marginBottom: "10px",
              border: "1px solid #eee",
            }}
          >
            <p style={{ margin: 0, fontWeight: 500 }}>{note.text}</p>
            <small style={{ color: "#666" }}>{note.category}</small>
 {note.summary && (
        <p>🧠 {note.summary}</p>
      )}

            <div style={{ marginTop: "10px" }}>
            <button
            onClick={() => deleteNote(note._id)}
            style={{
              padding: "5px 10px",
              fontSize: "12px",
              borderRadius: "4px",
              border: "none",
              background: "#e11d48",
              color: "white",
              cursor: "pointer",
            }}
          >
            {deletingId === note._id ? "Deleting..." : "Delete"}
          </button>

                            <button
              onClick={() => summarizeNote(note)}
              style={{
                padding: "5px 10px",
                fontSize: "12px",
                borderRadius: "4px",
                border: "none",
                background: "#2563eb",
                color: "white",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              {summarizingId === note._id ? "Summarizing..." : "Summarize"}
            </button>

            </div>
          </div>
        ))}
    </div>
  


  </main>
);

}
