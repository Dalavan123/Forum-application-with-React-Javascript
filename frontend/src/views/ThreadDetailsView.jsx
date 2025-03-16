import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CommentList } from '../components/CommentList';
import { CommentForm } from '../components/CommentForm';
import { fetchCommentsByThreadId, addComment } from '../api/apiComments';

export function ThreadDetailsView() {
  const { category_id, thread_id, user_id } = useParams();
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
      .then(data => {
        console.log('✅ Fetched Thread:', data);
        setThread(data);
      })
      .catch(error => console.error('Error fetching thread:', error))
      .finally(() => setLoading(false));

    // Fetch comments
    fetchCommentsByThreadId(thread_id)
      .then(data => {
        console.log('✅ Fetched Comments (Full API Response):', data); // ✅ Debugging full API response
        console.log('✅ Comments Array:', data.comments); // ✅ Debugging just the comments array
        setComments(data.comments || []);
      })
      .catch(error => console.error('Error fetching comments:', error));
  }, [category_id, thread_id]);

  // Handle adding a new comment
  const handleCommentSubmit = async newComment => {
    console.log('🔍 Sending Comment:', newComment); // ✅ Log the request body
    try {
      await addComment(thread_id, newComment);
      setComments([
        ...comments,
        {
          username: newComment.username,
          content: newComment.commentText,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div>
      {/* Display Thread Title */}
      <h1>{thread ? thread.title : 'Thread Not Found'}</h1>
      <p>{thread ? thread.content : 'Loading...'}</p>
      <p>Created by: {thread ? thread.username : 'Loading...'}</p>
      <p>
        Posted on:{' '}
        {thread ? new Date(thread.timestamp).toLocaleString() : 'Loading...'}
      </p>

      {/* Debugging log */}
      {console.log('🔍 Passing Comments to CommentList:', comments)}

      {/* Display Comments */}
      <CommentList comments={comments} />

      {/* Add a New Comment */}
      <CommentForm onSubmit={handleCommentSubmit} />
    </div>
  );
}
