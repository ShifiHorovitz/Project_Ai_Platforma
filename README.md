# AI Learning Platform - Full Stack Project

A full-stack learning platform where users can select topics, send prompts to AI, and receive personalized lessons.

## 🎯 Project Overview

This project implements a **mini MVP** of an AI-driven learning platform with:

- **Backend**: FastAPI + PostgreSQL + OpenAI integration
- **Frontend**: React + TypeScript + Tailwind CSS
- **Database**: PostgreSQL (via Docker)
- **AI**: OpenAI GPT API (with mock fallback)

## 📋 Features

### User Features
- ✅ User registration (name, phone, email)
- ✅ Category and sub-category selection
- ✅ Send prompts to AI
- ✅ View AI-generated lessons
- ✅ Learning history per user

### Admin Features
- ✅ View all users
- ✅ View all prompts and responses
- ✅ Admin dashboard

## 🏗️ Architecture

### Backend Structure
```
backend/
├── src/
│   ├── config/        # Database configuration
│   ├── models/        # SQLAlchemy models (User, Category, SubCategory, Prompt)
│   ├── schemas/       # Pydantic schemas (request/response validation)
│   ├── services/      # Business logic layer
│   ├── routers/       # FastAPI route handlers
│   └── ai/           # AI integration (OpenAI client)
├── main.py           # FastAPI app entry point
└── requirements.txt
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/   # React components
│   ├── pages/        # Page components
│   ├── services/     # API service layer
│   ├── types/        # TypeScript types
│   └── context/      # React Context (user state)
└── package.json
```

## 🚀 Quick Start

### Prerequisites
- Python 3.12+
- Node.js 18+
- Docker & Docker Compose

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Create `.env` file:**
```bash
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=ai_learning_db
POSTGRES_HOST=localhost
POSTGRES_PORT=5433
OPENAI_API_KEY=your_api_key_here  # Optional - will use mock if not set
```

5. **Start PostgreSQL with Docker:**
```bash
docker-compose -f ../docker/docker-compose.yml up -d
```

6. **Run the backend:**
```bash
python -m uvicorn main:app --reload
```

Backend will be available at `http://127.0.0.1:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file (optional):**
```bash
VITE_API_URL=http://127.0.0.1:8000
```

4. **Run the frontend:**
```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI**: `http://127.0.0.1:8000/docs`
- **ReDoc**: `http://127.0.0.1:8000/redoc`

### Main Endpoints

- `POST /users/` - Register new user
- `GET /users/` - List all users (admin)
- `GET /categories/` - List categories
- `GET /categories/sub?category_id=X` - List sub-categories
- `POST /prompts/` - Create prompt and get AI response
- `GET /prompts/user/{user_id}` - Get user's learning history
- `GET /prompts/` - List all prompts (admin)

## 🗄️ Database Schema

- **users**: id, name, phone, email, is_admin
- **categories**: id, name
- **sub_categories**: id, name, category_id
- **prompts**: id, user_id, category_id, sub_category_id, prompt, response, created_at

## 🧪 Testing the Flow

1. **Register a user** via the frontend
2. **Select a category** (e.g., "Science")
3. **Select a sub-category** (e.g., "Space")
4. **Enter a prompt** (e.g., "Teach me about black holes")
5. **View the AI-generated lesson**
6. **Check learning history** to see all previous lessons

## 📝 Example Use Case

> "Israel signs up and selects to learn about Science → Space. He enters a prompt: 'Teach me about black holes.' The system stores his input, sends it to an AI model, and returns a lesson. He can revisit the dashboard later to view all the lessons he received."

## 🛠️ Technologies Used

### Backend
- FastAPI
- SQLAlchemy (ORM)
- PostgreSQL
- OpenAI API
- Pydantic (validation)
- Python-dotenv

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Axios

## 📦 Project Structure

```
Project_AI_Platforma/
├── backend/          # FastAPI backend
├── frontend/         # React frontend
├── docker/           # Docker Compose for PostgreSQL
└── README.md         # This file
```

## 🔐 Environment Variables

### Backend (.env)
- `POSTGRES_USER` - Database user
- `POSTGRES_PASSWORD` - Database password
- `POSTGRES_DB` - Database name
- `POSTGRES_HOST` - Database host
- `POSTGRES_PORT` - Database port (5433 to avoid conflicts)
- `OPENAI_API_KEY` - OpenAI API key (optional)

### Frontend (.env)
- `VITE_API_URL` - Backend API URL

## 📄 License

This project is created for educational/assessment purposes.

## 👤 Author

Created as part of a full-stack developer assessment task.
