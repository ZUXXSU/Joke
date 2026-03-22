# JokeVault 🎭

JokeVault is a premium, high-fidelity joke generation website featuring a glassmorphic UI, smooth animations, and a PostgreSQL-backed API.

## 🚀 Features

- **Premium UI/UX:** Glassmorphism card design, noise texture backgrounds, and interactive glow effects.
- **Dynamic Content:** Serves programming and general jokes randomly from a PostgreSQL database.
- **Theming:** Full support for Dark and Light modes with a persistent toggle.
- **Responsive:** Optimized for all screen sizes from mobile to desktop.
- **Fast:** Powered by React 19, Vite 6, and Node.js.

## 🛠️ Tech Stack

- **Frontend:** React 19 (TypeScript), Vite 6, Vanilla CSS.
- **Backend:** Node.js, Express.js.
- **Database:** PostgreSQL (via Neon DB).
- **Communication:** REST API with Vite Proxy for CORS handling.

## 📦 Project Structure

```text
Joke/
├── backend/            # Express.js server
│   ├── index.js        # Server logic & DB seeding
│   └── .env            # Environment variables (DB URL)
├── frontend/           # React application
│   ├── src/            # App logic & Premium styles
│   └── vite.config.ts  # Vite & Proxy configuration
└── README.md
```

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- npm or yarn

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=5001
DATABASE_URL=your_postgresql_connection_string
```
Start the server:
```bash
node index.js
```

### 3. Frontend Setup
```bash
cd frontend
yarn install
```
Start the development server:
```bash
yarn dev --port 3000
```

## 🔌 API Specification

### Get Random Joke
- **Endpoint:** `GET /api/joke`
- **Response Format:**
```json
{
  "setup": "Why did the programmer quit his job?",
  "punchline": "Because he didn't get arrays."
}
```

## 🧪 Testing

To verify the backend is running correctly:
```bash
curl http://127.0.0.1:5001/api/joke
```

## 🛡️ Security

- Database credentials are managed via environment variables.
- CORS is restricted to ensure secure communication between layers.
