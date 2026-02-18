import { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabase';
import { AuthForm } from './components/AuthForm';
import { RoomList } from './components/RoomList';
import { ChatRoom } from './components/ChatRoom';
import './App.css';

interface User {
  id: string;
  email: string;
  username: string;
}

interface Room {
  id: string;
  name: string;
  lastMessage?: string;
  unread: number;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [rooms, setRooms] = useState<Room[]>([
    { id: 'general', name: 'General', unread: 0 },
    { id: 'random', name: 'Random', unread: 0 },
    { id: 'tech', name: 'Tech Talk', unread: 0 },
    { id: 'gaming', name: 'Gaming', unread: 0 },
  ]);
  const [activeRoom, setActiveRoom] = useState<string>('general');
  const [showMobileRooms, setShowMobileRooms] = useState(false);

  if (!user) {
    return <AuthForm onAuth={setUser} />;
  }

  return (
    <div className="chat-app">
      <RoomList
        rooms={rooms}
        activeRoom={activeRoom}
        onSelectRoom={(id) => { setActiveRoom(id); setShowMobileRooms(false); }}
        user={user}
        onLogout={() => setUser(null)}
        visible={showMobileRooms}
      />
      <ChatRoom
        roomId={activeRoom}
        roomName={rooms.find(r => r.id === activeRoom)?.name || ''}
        user={user}
        onShowRooms={() => setShowMobileRooms(true)}
      />
    </div>
  );
}
