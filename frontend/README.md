# AI Learning Platform - Frontend

React + TypeScript frontend for the AI Learning Platform.

## Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update `.env` if your backend runs on a different port:
```
VITE_API_URL=http://127.0.0.1:8000
```

## Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Features

- ✅ User registration
- ✅ Category and sub-category selection
- ✅ Send prompts to AI
- ✅ View AI-generated lessons
- ✅ Learning history per user
- ✅ Admin dashboard (users and prompts list)

## Project Structure

```
src/
├── components/     # Reusable React components
├── pages/         # Page components
├── services/      # API service layer
├── types/         # TypeScript type definitions
├── context/       # React Context (user state)
└── App.tsx        # Main app component with routing
```
