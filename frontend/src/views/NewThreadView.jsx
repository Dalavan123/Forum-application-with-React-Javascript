import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreadForm } from '../components/ThreadForm';
import { createThread } from '../api/apiThreads';

export function NewThreadView() {
  const navigate = useNavigate();

  const handleThreadSubmit = async threadData => {
    try {
      await createThread(threadData);
      navigate(`/categories/${threadData.category_id}`);
    } catch (err) {
      console.error('Error creating thread:', err);
    }
  };

  return (
    <div>
      <h1>Create a New Thread</h1>
      <ThreadForm onSubmit={handleThreadSubmit} />
      <button onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
}
