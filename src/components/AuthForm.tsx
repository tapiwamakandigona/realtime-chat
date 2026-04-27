import { useState } from 'react';
import { account } from '../lib/appwrite';

interface AuthFormProps {
  onAuth: (user: { id: string; email: string; username: string }) => void;
}

export function AuthForm({ onAuth }: AuthFormProps) {
  const [username, setUsername] = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = username.trim();
    if (!name)          { setError('Enter a username'); return; }
    if (name.length < 2){ setError('Username must be at least 2 characters'); return; }

    setLoading(true);
    try {
      // Reuse existing anonymous session or create a new one
      let appUser;
      try {
        appUser = await account.get();
      } catch {
        const session = await account.createAnonymousSession();
        appUser = session as any;
        // re-fetch proper user object
        appUser = await account.get();
      }
      localStorage.setItem('chat-username', name);
      onAuth({ id: appUser.$id, email: `${name}@chat.local`, username: name });
    } catch (err: any) {
      setError(err.message || 'Failed to join chat');
    } finally {
      setLoading(false);
    }
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
          <button type="submit" disabled={loading}>
            {loading ? 'Joining...' : 'Join Chat'}
          </button>
        </form>
      </div>
    </div>
  );
}
