import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreadForm } from '../components/ThreadForm';
import { createThread } from '../api/apiThreads';
import { ThreadContext } from '../context/ThreadContext';

export function NewThreadView() {
  const navigate = useNavigate();
  const { addNewThread } = useContext(ThreadContext);
  const [message, setMessage] = useState('');

  const handleThreadSubmit = async threadData => {
    try {
      const response = await createThread(threadData);
      console.log('New Thread Created', response);

      const newThread = response.thread;
      addNewThread(newThread); //Add the new thread to the context immedieately

      setMessage('Thread created successfully');

      //Redirect to the new thread immedieately after addint it to the state
      setTimeout(() => {
        navigate(
          `/categories/${threadData.category_id}/threads/${newThread.thread_id}`
        );
      }, 1000);
    } catch (err) {
      console.error('Error creating thread:', err);
      setMessage('Failed to create thread');
    }
  };

  return (
    <div>
      {message && <div className='success-message'> {message}</div>}
      <h1>Create a New Thread</h1>
      <ThreadForm onSubmit={handleThreadSubmit} />
      <button onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
}
