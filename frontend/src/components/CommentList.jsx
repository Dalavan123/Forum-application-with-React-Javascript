import React from 'react';
import { CommentActions } from './CommentActions';

export function CommentList({ comments }) {
  console.log('🛠️ Rendering Comments:', comments); // ✅ Debugging to ensure comments are passed correctly
  if (!comments || comments.length === 0) {
    return <p>No comments yet. Be the first to comment!</p>;
  }

  return (
    <ul>
      {comments.map(comment => (
        <li key={comment.comment_id || Math.random()}>
          {' '}
          {/* ✅ Ensures a unique key */}
          {/* ✅ Use comment_id or fallback */}
          <strong>{comment.username}</strong>: {comment.content}
          <br />
          <span style={{ fontSize: '0.8em', color: 'gray' }}>
            🕒 {new Date(comment.timestamp).toLocaleString()}{' '}
            {/* ✅ Format timestamp */}
          </span>
          {/* Comment Edit & Delete Buttons */}
          <CommentActions
            onEdit={() =>
              console.log('✏️ Editing comment:', comment.comment_id)
            }
            onDelete={() =>
              console.log('🗑️ Deleting comment:', comment.comment_id)
            }
          />
        </li>
      ))}
    </ul>
  );
}
