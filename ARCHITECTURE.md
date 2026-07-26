# Architecture

## Overview

A React chat application with room-based messaging, backed by [Appwrite](https://appwrite.io/) for anonymous authentication, document storage, and real-time event delivery.

## Component Tree

```
App
├── AuthForm    # Username entry + Appwrite anonymous session
├── RoomList    # Sidebar with room navigation and logout
└── ChatRoom    # Message list, realtime subscription, and input
```

## State Management

- **User state** — held in `App` via `useState`; restored on mount from the Appwrite session + `localStorage` username.
- **Messages** — fetched per room from the Appwrite `messages` collection, then kept in `ChatRoom` local state. New messages arrive via realtime subscription and are appended.
- **Room list** — static array of four rooms defined in `App.tsx` (`general`, `random`, `tech`, `gaming`).

## Message Flow

1. User types a message and presses Enter (or clicks Send).
2. `ChatRoom.sendMessage()` calls `databases.createDocument()` to persist the message in Appwrite.
3. Appwrite's Realtime service fires a `documents.*.create` event.
4. The `client.subscribe()` callback in `ChatRoom` receives the event, checks `roomId`, and appends the new message to state (with deduplication).
5. A `useEffect` scrolls the message list to the bottom whenever `messages` changes.

## Authentication

The app uses Appwrite **anonymous sessions**. On the auth form, the app either reuses an existing session (`account.get()`) or creates a new one (`account.createAnonymousSession()`). The chosen username is stored in `localStorage` under the key `chat-username`.

## Planned / Unused Components

The following components are scaffolded but not yet wired into the app:

- `EmojiPicker.tsx` — categorised emoji selection UI
- `MessageReactions.tsx` — per-message reaction display and toggle
- `useThreads.ts` — in-memory message threading hook
