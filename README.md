<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Real-Time%20Chat&fontSize=50&animation=fadeIn&fontAlignY=38&desc=React%20%2B%20Appwrite%20Realtime&descAlignY=51&descAlign=62" />
</div>

<h1 align="center">Appwrite Real-Time Chat Application</h1>

<div align="center">
  <p><strong>A real-time chat application built with React and Appwrite, featuring multiple chat rooms, anonymous authentication, and live message updates via Appwrite Realtime subscriptions.</strong></p>
  
  <p>
    <a href="https://tapiwamakandigona.github.io/realtime-chat/"><img src="https://img.shields.io/badge/Live_Demo-0A66C2?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Demo" /></a>
    <img src="https://img.shields.io/github/languages/top/tapiwamakandigona/realtime-chat?style=for-the-badge&color=blue" alt="Top Language" />
    <img src="https://img.shields.io/github/last-commit/tapiwamakandigona/realtime-chat?style=for-the-badge&color=green" alt="Last Commit" />
  </p>
</div>

---

## ⚡ Architecture Overview

The app uses [Appwrite](https://appwrite.io/) as its backend-as-a-service. The React frontend authenticates users via Appwrite's anonymous sessions, stores messages in an Appwrite database collection, and subscribes to real-time document events so new messages appear instantly across all connected clients.

See [ARCHITECTURE.md](ARCHITECTURE.md) for a detailed component and data-flow breakdown.

## 💬 Features

| Feature | Implementation |
|---------|---------------|
| **Instant Messages** | Appwrite Realtime subscription on the `messages` collection |
| **Anonymous Auth** | Appwrite anonymous sessions — users just pick a username |
| **Chat Rooms** | Messages partitioned by `roomId` field (`general`, `random`, `tech`, `gaming`) |
| **Session Persistence** | Sessions survive page refresh via Appwrite session restore |
| **Optimistic Recovery** | Message text restored to input on send failure |
| **Responsive UI** | Mobile-friendly layout with slide-out room sidebar |

---

## 🛠️ Technology Stack

- **Frontend:** React 18, TypeScript
- **Backend:** [Appwrite](https://appwrite.io/) (Authentication, Database, Realtime)
- **Styling:** Vanilla CSS with Custom Properties (dark theme)
- **Build/Dev:** Vite 5
- **CI/CD:** GitHub Actions → GitHub Pages

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ (see `.nvmrc`)
- An [Appwrite](https://appwrite.io/) project (cloud or self-hosted)

### 1. Clone & Install

```bash
git clone https://github.com/tapiwamakandigona/realtime-chat.git
cd realtime-chat
npm install
```

### 2. Configure Appwrite

1. Create a project at [cloud.appwrite.io](https://cloud.appwrite.io/) (or use a self-hosted instance).
2. Create a database (e.g. `chat-db`) and a collection called `messages` with the following attributes:
   - `roomId` — string, required
   - `userId` — string, required
   - `username` — string, required
   - `text` — string, required
   - `timestamp` — integer, required
3. In the collection settings, add a **Document Security** rule or collection-level permissions so authenticated users can create and read documents.
4. Create a `.env.local` file in the project root:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
```

### 3. Run Locally

```bash
npm run dev
```

Open the URL shown in the terminal (default: `http://localhost:5173/realtime-chat/`).

### 4. Build for Production

```bash
npm run build   # outputs to dist/
npm run preview # preview the production build locally
```

---

## 📁 Project Structure

```
src/
├── main.tsx                 # React entry point
├── App.tsx                  # Root component — auth, room selection, layout
├── App.css                  # All styles (CSS custom properties, dark theme)
├── components/
│   ├── AuthForm.tsx         # Username entry + anonymous session creation
│   ├── ChatRoom.tsx         # Message list, realtime subscription, send input
│   ├── RoomList.tsx         # Sidebar with room navigation + logout
│   ├── EmojiPicker.tsx      # Emoji picker UI (planned feature)
│   └── MessageReactions.tsx # Message reaction UI (planned feature)
├── hooks/
│   └── useThreads.ts        # Thread/reply hook (planned feature)
└── lib/
    ├── appwrite.ts          # Appwrite client, database, and account setup
    └── supabase.ts          # Legacy stub (no longer used)
```

---

<div align="center">
  <b>Built by <a href="https://github.com/tapiwamakandigona">Tapiwa Makandigona</a></b>
  <br/>
  <i>⭐ Star this repo if you found it useful!</i>
</div>
