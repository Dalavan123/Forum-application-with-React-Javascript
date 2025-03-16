import React from 'react';

export function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p>No comments yet. Be the first to comment!</p>;
  }

  return (
    <ul>
      {comments.map((comment, index) => (
        <li key={index}>
          <strong>{comment.username}</strong>: {comment.text}
        </li>
      ))}
    </ul>
  );
}
