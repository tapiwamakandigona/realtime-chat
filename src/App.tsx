import { useState, useEffect } from 'react';
import { account } from './lib/appwrite';
import { AuthForm }  from './components/AuthForm';
import { RoomList }  from './components/RoomList';
import { ChatRoom }  from './components/ChatRoom';
import './App.css';

interface User { id: string; email: string; username: string; }

interface Room { id: string; name: string; lastMessage?: string; unread: number; }

const ROOMS: Room[] = [
  { id: 'general', name: 'General',   unread: 0 },
  { id: 'random',  name: 'Random',    unread: 0 },
  { id: 'tech',    name: 'Tech Talk',  unread: 0 },
  { id: 'gaming',  name: 'Gaming',    unread: 0 },
];

export default function App() {
  const [user,            setUser]            = useState<User | null>(null);
  const [restoring,       setRestoring]       = useState(true);
  const [activeRoom,      setActiveRoom]      = useState('general');
  const [showMobileRooms, setShowMobileRooms] = useState(false);

  // Restore session across page refreshes
  useEffect(() => {
    const restore = async () => {
      try {
        const appUser  = await account.get();
        const username = localStorage.getItem('chat-username');
        if (username) {
          setUser({ id: appUser.$id, email: `${username}@chat.local`, username });
        }
      } catch {
        // No active session — show auth form
      } finally {
        setRestoring(false);
      }
    };
    restore();
  }, []);

  const handleLogout = async () => {
    try { await account.deleteSession('current'); } catch {}
    localStorage.removeItem('chat-username');
    setUser(null);
  };

  if (restoring) {
    return (
      <div className="auth-screen">
        <div className="auth-card"><p>Loading&#8230;</p></div>
      </div>
    );
  }

  if (!user) return <AuthForm onAuth={setUser} />;

  return (
    <div className="chat-app">
      <RoomList
        rooms={ROOMS}
        activeRoom={activeRoom}
        onSelectRoom={id => { setActiveRoom(id); setShowMobileRooms(false); }}
        user={user}
        onLogout={handleLogout}
        visible={showMobileRooms}
      />
      <ChatRoom
        roomId={activeRoom}
        roomName={ROOMS.find(r => r.id === activeRoom)?.name ?? ''}
        user={user}
        onShowRooms={() => setShowMobileRooms(true)}
      />
    </div>
  );
}
