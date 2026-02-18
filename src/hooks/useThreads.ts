import { useState, useCallback } from "react";

interface Reply {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: number;
}

type ThreadMap = Record<string, Reply[]>;

/**
 * Message threading system.
 * Each message can have replies forming a thread.
 */
export function useThreads() {
  const [threads, setThreads] = useState<ThreadMap>({});
  const [activeThread, setActiveThread] = useState<string | null>(null);

  const addReply = useCallback((messageId: string, userId: string, username: string, text: string) => {
    setThreads(prev => ({
      ...prev,
      [messageId]: [
        ...(prev[messageId] || []),
        { id: crypto.randomUUID(), userId, username, text, timestamp: Date.now() },
      ],
    }));
  }, []);

  const getReplies = useCallback((messageId: string): Reply[] => {
    return threads[messageId] || [];
  }, [threads]);

  const getReplyCount = useCallback((messageId: string): number => {
    return (threads[messageId] || []).length;
  }, [threads]);

  const openThread = useCallback((messageId: string) => {
    setActiveThread(messageId);
  }, []);

  const closeThread = useCallback(() => {
    setActiveThread(null);
  }, []);

  return { threads, activeThread, addReply, getReplies, getReplyCount, openThread, closeThread };
}
