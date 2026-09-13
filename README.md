# JOBORA

> **Your Career. Intelligently Matched.**

JOBORA is an AI-powered career intelligence platform designed for college students, fresh graduates, entry-level job seekers, and career switchers. It transforms resumes into structured career diagnostics, skill gap roadmaps, targeted resume rewrites, matched job requisitions, and AI interview simulations.

---

## Features

- **ATS Resume Analyzer (`/resume`)**: Multi-factor scoring, skill extraction, impact assessment, and missing keyword detection for PDF, DOCX, and TXT resumes.
- **AI Career Matching (`/careers`)**: Precision matching across 5+ high-growth tech roles with market growth and salary projections.
- **Skill Gap Diagnostic (`/skills`)**: Visual comparison of possessed vs required competencies, priority tags, and 30-day sprint milestones.
- **Resume Morph (`/morph`)**: Side-by-side original vs AI-improved bullet rewrites with quantifiable metrics and ATS keywords.
- **Intelligent Job Matcher (`/jobs`)**: Curated job listings ranked by candidate skill overlap with location and keyword filters.
- **AI Interview Simulator (`/interview`)**: Dynamic technical and scenario-based interview drills with instant multi-criteria grading.
- **AI Career Copilot (`/copilot`)**: Context-aware ChatGPT-style career advisor synced with candidate profile data.
- **Zero-Crash Demo / Fallback Mode**: Gracefully delivers full synthetic intelligence if no OpenRouter API key is provided.

---

## Tech Stack

- **Frontend**: React 19, Vite, React Router 7, Lucide React, Modern CSS (Glassmorphism & Dark Futuristic UI)
- **Backend**: Node.js, Express, REST API, Multer, PDF-Parse, JWT, BcryptJS
- **AI Engine**: Centralized OpenRouter Service (`server/services/ai.service.js`) with resilient fallback handlers
- **Storage**: Lightweight local JSON persistence (`server/data/`)

---

## Installation

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

---

## Environment Variables

Create `.env` in the `server` directory (template provided in `server/.env.example`):

```env
PORT=5000
OPENROUTER_API_KEY=
AI_MODEL=google/gemini-2.5-flash
JWT_SECRET=jobora_production_jwt_secret_key
```

*Note: If `OPENROUTER_API_KEY` is not provided, JOBORA runs in Demo / Fallback Mode with complete realistic intelligence.*

---

## Run Backend

```bash
cd server
npm start
```
*Backend runs on `http://localhost:5000`*

---

## Run Frontend

```bash
cd frontend
npm run dev
```
*Frontend runs on `http://localhost:5173`*
