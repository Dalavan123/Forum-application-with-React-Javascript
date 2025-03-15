import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Comments } from '../components/Comments';

export const ThreadDetailsView = () => {
  const { category_id, thread_id } = useParams();
  console.log('category_id:', category_id, 'thread_id:', thread_id); // Debugging output

  const [thread, setThread] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category_id || !thread_id) return;

    const fetchThread = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/categories/${category_id}/threads/${thread_id}`
        );
        if (!response.ok)
          throw new Error(`HTTP Error! Status: ${response.status}`);
        const data = await response.json();
        setThread(data);
      } catch (error) {
        console.error('Error fetching thread:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchThread();
  }, [category_id, thread_id]);

  useEffect(() => {
    if (!category_id || !thread_id) return;

    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/categories/${category_id}/threads/${thread_id}/comments`
        );
        if (!response.ok)
          throw new Error(`HTTP Error! Status: ${response.status}`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [category_id, thread_id]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div>
      <h1>{thread?.ThreadsTitle || 'Thread Not Found'}</h1>
      <Comments
        category_id={category_id}
        thread_id={thread_id}
        comments={comments}
      />
    </div>
  );
};
