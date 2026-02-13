🧠 Notely AI

AI-powered fullstack note management application

🔗 Live Demo: https://TU-URL-DE-VERCEL.vercel.app

📦 Repository: https://github.com/dianamartifleury/notely-ai

📌 Project Overview

Notely AI is a production-ready fullstack web application built to demonstrate modern development practices using Next.js, TypeScript and MongoDB.

The application allows users to manage notes with category filtering, real-time search and AI-style summaries, while showcasing clean UI/UX, state management and backend integration.

This project reflects:

End-to-end fullstack development

API design and database persistence

Production deployment with CI/CD

UX-focused interface improvements

Clean code structure and scalability mindset

🚀 Key Features

✍️ Create, edit and delete notes

🔎 Real-time search functionality

🏷️ Category filtering system

🧠 AI summary generation

💾 Summary persistence in MongoDB

🌙 Dark / Light mode toggle

✨ Smooth UI animations

📊 Live statistics dashboard

🔄 Automatic deployment via GitHub + Vercel

🛠 Tech Stack
Frontend

Next.js (App Router)

TypeScript

React Hooks (useState, useEffect)

Dynamic inline styling

Conditional rendering

Client-side state synchronization

Backend

Next.js API Routes

MongoDB Atlas

Mongoose ODM

RESTful architecture

CRUD operations

Server-side summary persistence

Deployment & DevOps

Vercel (Production Deployment)

GitHub integration

Continuous Deployment (CI/CD)

Environment variable management

🧠 AI Summary Logic

The application includes a backend summarization endpoint that:

Receives note text

Generates a short AI-style summary

Stores the summary in MongoDB

Updates the UI in real-time

This demonstrates:

Backend processing logic

Database update operations

Optimistic UI updates

Loading state management

Error handling

📊 Dashboard

The statistics panel dynamically calculates:

Total notes

Total AI summaries generated

Total categories

This simulates real SaaS-style dashboard metrics and data-driven UI components.

🌙 UX & UI Enhancements

Dark mode with dynamic styling

Smooth card animations

Hover effects and micro-interactions

Loading states for async operations

Confirmation before destructive actions

Clean and modern layout

📦 Local Installation
git clone https://github.com/dianamartifleury/notely-ai.git
cd notely-ai
npm install


Create a .env.local file:

MONGODB_URI=your_mongodb_connection_string


Run locally:

npm run dev

🔄 Deployment

The project is connected to GitHub and automatically deployed via Vercel.

Each push to the main branch triggers a new production deployment.

This setup reflects real-world development workflows.

🎯 What This Project Demonstrates

Fullstack application architecture

REST API design

Database integration

Asynchronous state management

UI/UX refinement

Production-ready deployment

Clean project organization

👩‍💻 Author

Developed by Diana Marti Fleury
Fullstack Developer