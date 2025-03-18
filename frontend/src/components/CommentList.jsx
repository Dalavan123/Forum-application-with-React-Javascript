/*Uppbyggnad av liststrukturen för kommentarerna, inget API-anrop
Får commentslistan från ThreadContext (föräldrer), exempelvis i ThreadDetailsview där ThreadContext
importeras och "comments" passeras in som props*/

import React from 'react';
import { CommentActions } from './CommentActions';

export function CommentList({ comments }) {
  console.log('🛠️ Rendering Comments:', comments); // Debugging to ensure comments are passed correctly
  if (!comments || comments.length === 0) {
    //Varnar om inga kommentarer
    return <p>No comments yet. Be the first to comment!</p>;
  }

  return (
    <ul>
      {comments.map(comment => (
        <li key={comment.comment_id}>
          {' '}
          {/* Ovan säkerställer unikt nyckelvärde*/}
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
