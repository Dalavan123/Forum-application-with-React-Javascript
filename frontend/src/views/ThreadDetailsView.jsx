import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Comments } from '../components/Comments';

export const ThreadDetailsView = () => {
  const { category_id, threads_id } = useParams();
  const [thread, setThread] = useState({});

  useEffect(() => {
    const fetchThread = async () => {
      const response = await fetch(
        `http://localhost:3000/categories/${category_id}/threads/${threads_id}/comments`
      );
      const data = await response.json();
      setThread(data);
    };
    fetchThread();
  }, [category_id, threads_id]);

  return (
    <div>
      <h1>{thread.ThreadsTitle}</h1> {/* //access the ThreadsTitle property */}
      <Comments category_id={category_id} threads_id={threads_id} />
    </div>
  );
};
