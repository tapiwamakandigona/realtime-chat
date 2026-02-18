// Supabase client for real-time features
// Replace with your own project URL and anon key

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// For demo purposes, using a mock client
export const supabase = {
  from: (table: string) => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: (data: any) => Promise.resolve({ data, error: null }),
  }),
  channel: (name: string) => ({
    on: (_event: string, _filter: any, _callback: any) => ({ subscribe: () => {} }),
  }),
};
