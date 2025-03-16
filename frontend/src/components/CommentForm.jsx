import React, { useState } from 'react';
import { ActionButton } from './buttonComponents/ActionButton';

export function CommentForm({ onSubmit }) {
  const [commentText, setCommentText] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!commentText.trim() || !username.trim()) return;
    onSubmit({ commentText, username });
    setCommentText('');
    setUsername('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Comment:</label>
        <textarea
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          required
        />
      </div>

      {/* Use Reusable Button Component */}
      <ActionButton
        label='Add Comment'
        onClick={handleSubmit}
        className='add-comment-button'
      >
        Add Comment
      </ActionButton>
    </form>
  );
}
