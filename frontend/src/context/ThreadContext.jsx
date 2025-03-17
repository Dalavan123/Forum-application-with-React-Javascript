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

  // ✅ Ensure `addNewThread` is correctly defined
  const addNewThread = newThread => {
    console.log('✅ Adding new thread to state:', newThread);
    setThreads(prevThreads => [...prevThreads, newThread]);
  };

  // Ensure new threads update immedieately in state
  const loadComments = async threadId => {
    try {
      console.log('🔄 Fetching comments for thread:', threadId);
      const data = await fetchCommentsByThreadId(threadId);
      console.log('✅ API Response for Comments:', data); // ✅ Debugging

      if (data.comments) {
        setComments(prev => ({
          ...prev,
          [threadId]: data.comments, // ✅ Store comments in state properly
        }));
      }
    } catch (error) {
      console.error(
        `❌ Error fetching comments for thread ${threadId}:`,
        error
      );
    }
  };

  return (
    <ThreadContext.Provider
      value={{
        threads,
        setThreads,
        addNewThread,
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
