import { useState } from 'react';

interface AuthFormProps {
  onAuth: (user: { id: string; email: string; username: string }) => void;
}

export function AuthForm({ onAuth }: AuthFormProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = username.trim();
    if (!name) { setError('Enter a username'); return; }
    if (name.length < 2) { setError('Username must be at least 2 characters'); return; }
    onAuth({ id: crypto.randomUUID(), email: `${name}@chat.local`, username: name });
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <h1>Chat</h1>
        <p>Enter a username to start chatting</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => { setUsername(e.target.value); setError(''); }}
            autoFocus
            maxLength={20}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Join Chat</button>
        </form>
      </div>
    </div>
  );
}
