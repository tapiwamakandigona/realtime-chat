import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: number;
}

interface ChatRoomProps {
  roomId: string;
  roomName: string;
  user: { id: string; username: string };
  onShowRooms: () => void;
}

// In-memory message store (per room)
const messageStore: Record<string, Message[]> = {};

export function ChatRoom({ roomId, roomName, user, onShowRooms }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);
  const typingTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setMessages(messageStore[roomId] || []);
  }, [roomId]);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    
    const msg: Message = {
      id: crypto.randomUUID(),
      userId: user.id,
      username: user.username,
      text,
      timestamp: Date.now(),
    };
    
    if (!messageStore[roomId]) messageStore[roomId] = [];
    messageStore[roomId].push(msg);
    setMessages([...messageStore[roomId]]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <main className="chat-room">
      <header className="chat-header">
        <button className="mobile-menu" onClick={onShowRooms}>\u2630</button>
        <div>
          <h3># {roomName}</h3>
          <span className="online-count">Online</span>
        </div>
      </header>

      <div className="messages">
        {messages.length === 0 && (
          <div className="empty-state">
            <p>No messages yet in #{roomName}</p>
            <p>Be the first to say something!</p>
          </div>
        )}
        {messages.map((msg, i) => {
          const isOwn = msg.userId === user.id;
          const showAvatar = i === 0 || messages[i - 1].userId !== msg.userId;
          return (
            <div key={msg.id} className={`message ${isOwn ? 'own' : ''} ${showAvatar ? 'with-avatar' : ''}`}>
              {showAvatar && !isOwn && (
                <div className="avatar">{msg.username[0].toUpperCase()}</div>
              )}
              <div className="message-content">
                {showAvatar && (
                  <div className="message-header">
                    <span className="username">{isOwn ? 'You' : msg.username}</span>
                    <span className="timestamp">{formatTime(msg.timestamp)}</span>
                  </div>
                )}
                <p className="message-text">{msg.text}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEnd} />
      </div>

      <div className="input-area">
        <textarea
          placeholder={`Message #${roomName}...`}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button className="send-btn" onClick={sendMessage} disabled={!input.trim()}>
          Send
        </button>
      </div>
    </main>
  );
}
