import { useState } from "react";

interface Reaction {
  emoji: string;
  users: string[];
}

interface MessageReactionsProps {
  messageId: string;
  userId: string;
  reactions: Record<string, Reaction>;
  onReact: (messageId: string, emoji: string) => void;
}

const QUICK_REACTIONS = ["\u{1F44D}", "\u{2764}", "\u{1F602}", "\u{1F389}", "\u{1F914}", "\u{1F525}"];

export function MessageReactions({ messageId, userId, reactions, onReact }: MessageReactionsProps) {
  const [showPicker, setShowPicker] = useState(false);
  
  return (
    <div className="reactions-container">
      {Object.entries(reactions).map(([emoji, reaction]) => {
        const hasReacted = reaction.users.includes(userId);
        return (
          <button
            key={emoji}
            className={"reaction-btn" + (hasReacted ? " reacted" : "")}
            onClick={() => onReact(messageId, emoji)}
            title={reaction.users.join(", ")}
          >
            {emoji} {reaction.users.length}
          </button>
        );
      })}
      
      <button
        className="add-reaction-btn"
        onClick={() => setShowPicker(!showPicker)}
      >
        +
      </button>
      
      {showPicker && (
        <div className="reaction-picker">
          {QUICK_REACTIONS.map(emoji => (
            <button
              key={emoji}
              onClick={() => { onReact(messageId, emoji); setShowPicker(false); }}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
