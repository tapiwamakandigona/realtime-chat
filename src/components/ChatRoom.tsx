import { useState, useEffect, useRef } from 'react';
import { client, databases, DB_ID, MESSAGES_COLLECTION, ID, Query } from '../lib/appwrite';

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

function toMessage(doc: Record<string, any>): Message {
  return {
    id:        doc.$id,
    userId:    doc.userId,
    username:  doc.username,
    text:      doc.text,
    timestamp: doc.timestamp,
  };
}

export function ChatRoom({ roomId, roomName, user, onShowRooms }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(true);
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([]);
    setLoading(true);

    let unsub: (() => void) | undefined;

    const init = async () => {
      try {
        const res = await databases.listDocuments(DB_ID, MESSAGES_COLLECTION, [
          Query.equal('roomId', roomId),
          Query.orderAsc('timestamp'),
          Query.limit(100),
        ]);
        setMessages(res.documents.map(toMessage));
      } catch (e) {
        console.error('Failed to load messages:', e);
      } finally {
        setLoading(false);
      }

      // Subscribe to realtime document events for the messages collection
      unsub = client.subscribe(
        `databases.${DB_ID}.collections.${MESSAGES_COLLECTION}.documents`,
        (event) => {
          const isCreate = event.events.some((ev: string) => ev.endsWith('.create'));
          if (isCreate) {
            const doc = event.payload as Record<string, any>;
            if (doc.roomId === roomId) {
              setMessages(prev => prev.some(m => m.id === doc.$id) ? prev : [...prev, toMessage(doc)]);
            }
          }
        },
      );
    };

    init();
    return () => { unsub?.(); };
  }, [roomId]);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    try {
      await databases.createDocument(DB_ID, MESSAGES_COLLECTION, ID.unique(), {
        roomId,
        userId:   user.id,
        username: user.username,
        text,
        timestamp: Date.now(),
      });
    } catch (e) {
      console.error('Failed to send message:', e);
      setInput(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <main className="chat-room">
      <header className="chat-header">
        <button className="mobile-menu" onClick={onShowRooms}>&#9776;</button>
        <div>
          <h3># {roomName}</h3>
          <span className="online-count">Live</span>
        </div>
      </header>

      <div className="messages">
        {loading && <div className="empty-state"><p>Loading messages&#8230;</p></div>}
        {!loading && messages.length === 0 && (
          <div className="empty-state">
            <p>No messages yet in #{roomName}</p>
            <p>Be the first to say something!</p>
          </div>
        )}
        {messages.map((msg, i) => {
          const isOwn       = msg.userId === user.id;
          const showAvatar  = i === 0 || messages[i - 1].userId !== msg.userId;
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
