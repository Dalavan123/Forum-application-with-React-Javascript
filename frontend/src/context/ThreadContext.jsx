import React, { createContext, useState, useEffect } from 'react';
import { fetchThreads } from '../api/apiThreads';
import { fetchCommentsByThreadId } from '../api/apiComments';

export const ThreadContext = createContext();

export function ThreadProvider({ children }) {
  const [threads, setThreads] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchThreads()
      .then(data => {
        setThreads(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching threads:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const loadComments = async threadId => {
    try {
      const data = await fetchCommentsByThreadId(threadId);
      setComments(prev => ({ ...prev, [threadId]: data.comments || [] }));
    } catch (error) {
      console.error(`Error fetching comments for thread ${threadId}:`, error);
    }
  };

  return (
    <ThreadContext.Provider
      value={{
        threads,
        setThreads,
        comments,
        setComments,
        loadComments,
        loading,
        error,
      }}
    >
      {children}
    </ThreadContext.Provider>
  );
}
