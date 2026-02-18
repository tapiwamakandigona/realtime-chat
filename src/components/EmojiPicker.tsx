import { useState } from 'react';

const EMOJI_CATEGORIES = {
  'Smileys': ['\u{1F600}', '\u{1F601}', '\u{1F602}', '\u{1F603}', '\u{1F604}', '\u{1F605}', '\u{1F606}', '\u{1F609}', '\u{1F60A}', '\u{1F60D}', '\u{1F618}', '\u{1F60E}', '\u{1F914}', '\u{1F917}', '\u{1F644}', '\u{1F62D}', '\u{1F621}', '\u{1F631}', '\u{1F4AF}'],
  'Gestures': ['\u{1F44D}', '\u{1F44E}', '\u{1F44F}', '\u{1F64F}', '\u{1F4AA}', '\u{270C}', '\u{1F44C}', '\u{1F44B}', '\u{1F91D}', '\u{1F91E}'],
  'Objects': ['\u{2764}', '\u{1F525}', '\u{2B50}', '\u{1F389}', '\u{1F3AF}', '\u{1F4A1}', '\u{1F4BB}', '\u{1F680}', '\u{1F3AE}', '\u{1F3B5}'],
};

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  visible: boolean;
  onClose: () => void;
}

export function EmojiPicker({ onSelect, visible, onClose }: EmojiPickerProps) {
  const [category, setCategory] = useState<string>('Smileys');
  
  if (!visible) return null;
  
  return (
    <div className="emoji-picker" onClick={e => e.stopPropagation()}>
      <div className="emoji-tabs">
        {Object.keys(EMOJI_CATEGORIES).map(cat => (
          <button
            key={cat}
            className={category === cat ? 'active' : ''}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="emoji-grid">
        {EMOJI_CATEGORIES[category as keyof typeof EMOJI_CATEGORIES]?.map((emoji, i) => (
          <button key={i} className="emoji-btn" onClick={() => { onSelect(emoji); onClose(); }}>
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
