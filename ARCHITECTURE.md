# Architecture

## Overview

React chat application with room-based messaging.

## Components

```
App
├── AuthForm    # Username entry (no password needed)
├── RoomList    # Sidebar with room navigation
└── ChatRoom    # Messages display and input
```

## State

- User state in App component
- Messages stored in-memory per room (messageStore map)
- Room list is static (General, Random, Tech Talk, Gaming)

## Message Flow

1. User types message, presses Enter
2. Message added to in-memory store
3. React state updated, component re-renders
4. Auto-scroll to bottom via ref

## Supabase Integration (Optional)

The `lib/supabase.ts` provides a mock client. Replace with real Supabase credentials for:
- Persistent message storage
- Real-time subscriptions via Supabase Realtime
- User authentication
