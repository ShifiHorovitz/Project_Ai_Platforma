# AI Learning Platform - Full Stack Project 🚀

A comprehensive learning platform where users receive personalized, AI-generated lessons based on their chosen topics.

## 🎯 Project Overview

This project is a **Full Stack MVP** that leverages modern AI to create a dynamic educational experience.
- **Backend**: FastAPI (Python) + PostgreSQL.
- **Frontend**: React + TypeScript + Tailwind CSS.
- **Infrastructure**: Containerized PostgreSQL via Docker.
- **AI Engine**: Google Gemini AI (Generative AI integration).

## 📋 Key Features

### User Experience
- ✅ **Secure Authentication**: Registration and login flow.
- ✅ **Personalized Learning**: Select Categories (e.g., Science) and Sub-categories (e.g., Physics).
- ✅ **AI Tutor**: Send specific prompts and receive structured lessons.
- ✅ **Learning History**: Access and review all past AI interactions.

### Admin Dashboard
- ✅ **User Management**: View all registered students and their details.
- ✅ **Transparency**: Monitor all AI prompts and responses generated in the system.
- ✅ **Dynamic Permissions**: Auto-promote admins via environment configuration.

## 🏗️ Technical Architecture

### Backend (Clean Architecture)
```text
backend/src/
├── ai/             # Google Gemini API integration
├── config/         # Database and Auth configurations
├── models/         # SQLAlchemy DB models (User, Category, Prompt)
├── routers/        # FastAPI endpoints (The Gatekeepers)
├── services/       # Business Logic Layer (The Heart of the app)
└── schemas/        # Pydantic data validation (DTOs)

🚀 Quick Start
1. Database Setup (Docker)
Ensure Docker is running and execute:

docker-compose -f docker/docker-compose.yml up -d

2. Backend Setup

cd backend
# Install dependencies
pip install -r requirements.txt
# Run server
python -m uvicorn main:app --reload

3. Frontend Setup
cd frontend
npm install
npm run dev

### 🔐 Environment Variables (.env)

Essential configuration for the `backend/` directory:

* **OPENAI_API_KEY**: Your OpenAI API Key (starts with `sk-`).
* **ADMIN_EMAIL**: The email address that will be granted Admin privileges.
* **POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD**: Database credentials.
* **POSTGRES_PORT**: Set to `5433` to match the docker configuration.

## 🛠️ Technologies Used

* **Frameworks**: FastAPI, React 18.
* **Languages**: Python 3.12, TypeScript.
* **Styling**: Tailwind CSS.
* **Database**: PostgreSQL with SQLAlchemy.
* **AI**: OpenAI GPT API.

---
*Created as a Full Stack development assessment project.*