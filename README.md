# 🧠 Notely AI

> AI-powered note management system built with Next.js, TypeScript and MongoDB.

Notely AI is a fullstack web application that allows users to create, manage, search, categorize, and summarize notes using a modular API architecture.

---

## 🚀 Live Demo

(Coming soon – deployed on Vercel)

---

## ✨ Features

- ✅ Create, read and delete notes (CRUD)
- 🔍 Real-time text search
- 🏷 Filter notes by category
- 🧠 AI-style note summarization (persisted in database)
- ⏳ Smart loading states with UX feedback
- 🛑 Delete confirmation
- 🎨 Clean SaaS-style UI
- 📦 REST API architecture using Next.js App Router

---

## 🧠 AI Summary System

Each note can be summarized via a dedicated `/api/summarize` endpoint.

The summary:
- Is generated via server-side logic
- Is persisted in MongoDB
- Survives page reloads
- Follows a scalable architecture ready for integration with real AI APIs (e.g., OpenAI)

---

## 🏗 Architecture

app/
├── api/
│ ├── notes/
│ │ └── route.ts
│ └── summarize/
│ └── route.ts
├── page.tsx
lib/
└── mongodb.ts
models/
└── Note.ts


The application separates:

- CRUD operations
- AI summarization logic
- Database connection
- UI logic

---

## 🛠 Tech Stack

- **Next.js 16 (App Router)**
- **TypeScript**
- **MongoDB Atlas**
- **Mongoose**
- **REST API Routes**
- **React Hooks**
- **Client/Server architecture separation**

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/notely-ai.git
cd notely-ai
Install dependencies:

npm install
Create a .env.local file:

MONGODB_URI=your_mongodb_connection_string
Run development server:

npm run dev
🎯 What This Project Demonstrates
Fullstack architecture design

API route structuring

Database schema modeling

Asynchronous state handling

UX-driven development

Clean component organization

Scalable structure for AI integrations

📌 Future Improvements
Real AI API integration (OpenAI)

Authentication system

Edit note feature

Drag & drop note ordering

Dark mode

Deployment optimizations

👩‍💻 Author
Built by Diana
Fullstack Developer 