<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Real-Time%20Chat&fontSize=50&animation=fadeIn&fontAlignY=38&desc=React%20%2B%20Supabase%20WebSockets&descAlignY=51&descAlign=62" />
</div>

<h1 align="center">Supabase Real-Time Chat Application</h1>

<div align="center">
  <p><strong>A lightning-fast, production-ready chat application demonstrating WebSocket communication via Supabase Realtime, with active typing indicators, chat rooms, and persistent message history.</strong></p>
  
  <p>
    <a href="https://tapiwamakandigona.github.io/realtime-chat/"><img src="https://img.shields.io/badge/Live_Demo-0A66C2?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Demo" /></a>
    <img src="https://img.shields.io/github/languages/top/tapiwamakandigona/realtime-chat?style=for-the-badge&color=blue" alt="Top Language" />
    <img src="https://img.shields.io/github/last-commit/tapiwamakandigona/realtime-chat?style=for-the-badge&color=green" alt="Last Commit" />
  </p>
</div>

---

## ⚡ Architecture Overview

Building a chat app is the "Hello World" of web sockets, but this architecture is built for scale. It offloads connection management and event broadcasting to **Supabase Realtime**, allowing the React frontend to focus purely on rendering UI updates.

## 💬 Features

| Feature | Implementation |
|---------|---------------|
| **Instant Messages** | `postgres_changes` listens for new rows in the `messages` table |
| **Typing Indicators** | ephemeral `broadcast` events sent to presence channels |
| **Online Status** | `presence` state synchronization across all connected clients |
| **Chat Rooms** | Database-level partitioning of message clusters |
| **Local Cache** | Optimistic UI updates before server confirmation |

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript
- **WebSockets:** `@supabase/supabase-js`
- **Database:** PostgreSQL (Supabase BAAS)
- **Styling:** Vanilla CSS Custom Properties
- **Build/Dev:** Vite
- **CI/CD:** GitHub Actions

---

## 🚀 Quick Start

```bash
git clone https://github.com/tapiwamakandigona/realtime-chat.git
cd realtime-chat
npm install
```

### Configure Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL schema provided in `/docs/schema.sql` (if available) or create a `messages` table.
3. Enable Realtime on the `messages` table.
4. Add your keys to `.env.local`:

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Run Locally

```bash
npm run dev
```

---

<div align="center">
  <b>Built by <a href="https://github.com/tapiwamakandigona">Tapiwa Makandigona</a></b>
  <br/>
  <i>⭐ Star this repo if it helped you understand Supabase Realtime!</i>
</div>
