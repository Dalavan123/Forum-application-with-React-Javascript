import React, { useState, useEffect } from 'react';

export const Comments = ({ category_id, thread_id }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      if (!thread_id) return; // don't make API call if threads_id is empty
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/categories/${category_id}/threads/${thread_id}/comments`
      );
      const data = await response.json();
      console.log('API response:', data); // add this console log
      setComments(data.comments);
      setLoading(false);
    };
    fetchComments();
  }, [thread_id, category_id]);

  const editComment = () => {
    // Handle edit comment logic here
  };

  return (
    <div>
      {loading ? (
        <p>Loading comments...</p>
      ) : Array.isArray(comments) ? (
        comments.map(comment => (
          <div key={comment.comment_id}>
            <p>Posted by {comment.username}</p>
            <p>{comment.content}</p>
          </div>
        ))
      ) : (
        <p>No comments found.</p>
      )}
    </div>
  );
};
