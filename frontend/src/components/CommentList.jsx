import React from 'react';

export function CommentList({ comments }) {
  console.log('🛠️ Rendering Comments:', comments); // ✅ Debugging to ensure comments are passed correctly
  if (!comments || comments.length === 0) {
    return <p>No comments yet. Be the first to comment!</p>;
  }

  return (
    <ul>
      {comments.map((comment, index) => (
        <li key={comment.comment_id || index}>
          {' '}
          {/* ✅ Use comment_id or fallback */}
          <strong>{comment.username}</strong>: {comment.content}
          <br />
          <span style={{ fontSize: '0.8em', color: 'gray' }}>
            🕒 {new Date(comment.timestamp).toLocaleString()}{' '}
            {/* ✅ Format timestamp */}
          </span>
        </li>
      ))}
    </ul>
  );
}
