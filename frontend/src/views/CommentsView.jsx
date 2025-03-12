import React, { useState, useEffect } from 'react';
import ActionButton from '../components/ActionButton'; // Import the ActionButton component

export const CommentsView = ({ category_id, threads_id }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      if (!threads_id) return; // don't make API call if threads_id is empty
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/categories/${category_id}/threads/${threads_id}/comments`
      );
      const data = await response.json();
      console.log('API response:', data); // add this console log
      setComments(data.comments);
      setLoading(false);
    };
    fetchComments();
  }, [threads_id, category_id]);

  const editComment = () => {
    // Handle edit comment logic here
  };

  return (
    <div>
      {loading ? (
        <p>Loading comments...</p>
      ) : Array.isArray(comments) ? (
        comments.map(comment => (
          <div key={comment.comments_id}>
            <p>Posted by {comment.username}</p>
            <p>{comment.content}</p>
            <ActionButton
              type='comment'
              id={comment.comments_id}
              action='edit'
              threads_id={threads_id}
            />
            <ActionButton
              type='comment'
              id={comment.comments_id}
              action='delete'
              threads_id={threads_id}
            />
            <ActionButton label='Edit' onClick={editComment} />
          </div>
        ))
      ) : (
        <p>No comments found.</p>
      )}
    </div>
  );
};
