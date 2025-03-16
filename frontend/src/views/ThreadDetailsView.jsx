import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CommentList } from '../components/CommentList';
import { CommentForm } from '../components/CommentForm';
import { fetchCommentsByThreadId, addComment } from '../api/apiComments';

export function ThreadDetailsView() {
  const { category_id, thread_id } = useParams();
  const [thread, setThread] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category_id || !thread_id) return;

    // Fetch thread details
    fetch(
      `http://localhost:3000/categories/${category_id}/threads/${thread_id}`
    )
      .then(res => res.json())
      .then(data => setThread(data))
      .catch(error => console.error('Error fetching thread:', error))
      .finally(() => setLoading(false));

    // Fetch comments
    fetchCommentsByThreadId(thread_id)
      .then(data => setComments(data.comments || []))
      .catch(error => console.error('Error fetching comments:', error));
  }, [category_id, thread_id]);

  // Handle adding a new comment
  const handleCommentSubmit = async newComment => {
    console.log('🔍 Sending Comment:', newComment); // ✅ Log the request body
    try {
      await addComment(thread_id, newComment);
      setComments([
        ...comments,
        { username: newComment.username, text: newComment.commentText },
      ]);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div>
      <h1>{thread?.title || 'Thread Not Found'}</h1>

      {/* Display Comments */}
      <CommentList comments={comments} />

      {/* Add a New Comment */}
      <CommentForm onSubmit={handleCommentSubmit} />
    </div>
  );
}
