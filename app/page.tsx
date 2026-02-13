"use client";


import { useEffect, useState } from "react";

type Note = {
  _id: string;
  text: string;
  category: string;
  summary?: string;
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
const [search, setSearch] = useState("");
const [adding, setAdding] = useState(false);
const [deletingId, setDeletingId] = useState<string | null>(null);
const [summarizingId, setSummarizingId] = useState<string | null>(null);
const [selectedCategory, setSelectedCategory] = useState("all");
const [editingNote, setEditingNote] = useState<Note | null>(null);
const [editingText, setEditingText] = useState("");
const [editingCategory, setEditingCategory] = useState("");
const [updating, setUpdating] = useState(false);


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
 

async function updateNote() {
  if (!editingNote) return;

  try {
    setUpdating(true);

    const res = await fetch("/api/notes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editingNote._id,
        text: editingText,
        category: editingCategory,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to update");
    }

    const updated = await res.json();

    if (!updated) {
      throw new Error("No data returned");
    }

    setNotes((prev) =>
      prev.map((n) =>
        n._id === updated._id ? updated : n
      )
    );

    setEditingNote(null);
  } catch (err) {
    console.error(err);
    alert("Something went wrong while updating.");
  } finally {
    setUpdating(false);
  }
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
    background: darkMode
      ? "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)"
      : "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)",
    display: "flex",
    justifyContent: "center",
    padding: "60px 20px",
    fontFamily: "system-ui, sans-serif",
    transition: "all 0.3s ease",
  }}
>

  <div
    style={{
      width: "650px",
      background: "white",
      padding: "40px",
      borderRadius: "16px",
      boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
      transition: "all 0.3s ease",
    }}
  >
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
  <button
    onClick={() => setDarkMode(!darkMode)}
    style={{
      padding: "6px 12px",
      borderRadius: "20px",
      border: "none",
      cursor: "pointer",
      background: darkMode ? "#facc15" : "#111",
      color: darkMode ? "#111" : "white",
      fontSize: "12px",
    }}
  >
    {darkMode ? "☀ Light" : "🌙 Dark"}
  </button>
</div>

   <h1 style={{ marginBottom: "10px" }}>Notely AI</h1>

<span
  style={{
    display: "inline-block",
    background: "#3b82f6",
    color: "white",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    marginBottom: "20px",
  }}
>
  🧠 AI Powered
</span>
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
    padding: "15px",
    borderRadius: "12px",
    background: darkMode ? "#1e293b" : "#f1f5f9",
  }}
>
  {/* TOTAL NOTES */}
  <div>
    <strong style={{ color: darkMode ? "#f8fafc" : "#111" }}>
      {notes.length}
    </strong>
    <div
      style={{
        fontSize: "12px",
        opacity: 0.7,
        color: darkMode ? "#cbd5e1" : "#555",
      }}
    >
      Total Notes
    </div>
  </div>

  {/* AI SUMMARIES */}
  <div>
    <strong style={{ color: darkMode ? "#f8fafc" : "#111" }}>
      {notes.filter((n) => n.summary).length}
    </strong>
    <div
      style={{
        fontSize: "12px",
        opacity: 0.7,
        color: darkMode ? "#cbd5e1" : "#555",
      }}
    >
      AI Summaries
    </div>
  </div>

  {/* CATEGORIES */}
  <div>
    <strong style={{ color: darkMode ? "#f8fafc" : "#111" }}>
      {categories.length}
    </strong>
    <div
      style={{
        fontSize: "12px",
        opacity: 0.7,
        color: darkMode ? "#cbd5e1" : "#555",
      }}
    >
      Categories
    </div>
  </div>
</div>



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
  disabled={adding}
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: adding ? "#444" : "#111",
    color: "white",
    cursor: adding ? "not-allowed" : "pointer",
    marginBottom: "25px",
    fontWeight: 500,
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
      padding: "18px",
      borderRadius: "12px",
      background: darkMode ? "#1e293b" : "#ffffff", // color de fondo para modo oscuro y claro
      marginBottom: "15px",
      border: darkMode
        ? "1px solid #334155" // modo oscuro
        : "1px solid #e5e7eb",
      boxShadow: "0 5px 15px rgba(0,0,0,0.03)",
      transition: "all 0.25s ease",
      animation: "fadeSlide 0.4s ease",
    }}
    className="note-card"
  >
            <p
            style={{
              margin: 0,
              fontWeight: 500,
              color: darkMode ? "#f8fafc" : "#111", // 👈 texto blanco en dark
            }}
          >
            {note.text}
          </p>


            <span
  style={{
    display: "inline-block",
    background: darkMode ? "#334155" : "#e5e7eb",
    color: darkMode ? "#f1f5f9" : "#111", // color de texto para modo oscuro y claro
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    marginTop: "6px",
  }}
>
  {note.category}
</span>


 {note.summary && (
  <p
    style={{
      marginTop: "8px",
      color: darkMode ? "#cbd5e1" : "#555",
    }}
  >
    🧠 {note.summary}
  </p>
)}


            <div style={{ marginTop: "10px" }}>
            <button
            onClick={() => deleteNote(note._id)}
            style={{
              padding: "6px 12px",
              fontSize: "12px",
              borderRadius: "6px",
              border: "none",
              background: "#ef4444",
              color: "white",
              cursor: "pointer",
              transition: "all 0.2s ease",
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
                background: "#3b82f6",
                color: "white",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
            
     
              {summarizingId === note._id ? "Summarizing..." : "Summarize"}
            </button>
           <button
            onClick={() => {
              setEditingNote(note);
              setEditingText(note.text);
              setEditingCategory(note.category);
            }}
            style={{
              padding: "5px 10px",
              fontSize: "12px",
              borderRadius: "4px",
              border: "none",
              background: "#10b981",
              color: "white",
              cursor: "pointer",
              marginLeft: "10px",
            }}
          >
            Edit
          </button>         
            </div>
          </div>
        ))}
    </div>
  {editingNote && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      animation: "fadeIn 0.2s ease",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        width: "400px",
        animation: "scaleIn 0.2s ease",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>Edit Note</h3>

      <input
        value={editingText}
        onChange={(e) => setEditingText(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "6px",
          border: "1px solid #ddd",
        }}
      />

      <input
        value={editingCategory}
        onChange={(e) => setEditingCategory(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ddd",
        }}
      />

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <button
          onClick={() => setEditingNote(null)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ddd",
            background: "white",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>

        <button
          onClick={updateNote}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "none",
            background: "#111",
            color: "white",
            cursor: "pointer",
          }}
        >
          {updating ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  </div>
)}

<style>
{`
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.note-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.08);
}

button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

input:focus, select:focus {
  outline: none;
  border-color: #111;
  box-shadow: 0 0 0 2px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
}
  @keyframes fadeSlide {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
`}
</style>


  </main>
);

}
