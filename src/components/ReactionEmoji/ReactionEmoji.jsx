import React from 'react';
import './ReactionEmoji.css';

const ReactionEmoji = ({ onReact }) => {
  const emojis = ['😂', '❤️', '👍'];

  return (
    <div className="reaction-emojis">
      {emojis.map((emoji) => (
        <span key={emoji} onClick={() => onReact(emoji)} className="emoji">
          {emoji}
        </span>
      ))}
    </div>
  );
};

export default ReactionEmoji;
