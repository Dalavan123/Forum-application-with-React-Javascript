/*Hanterar trådar globalt, hämtar, lägger till, uppdaterar.
Hanterar kommentarer per tråd, sparar i stateobjekt*/

import React, { createContext, useState, useEffect } from 'react';
import { fetchThreads } from '../api/apiThreads';
import { fetchCommentsByThreadId } from '../api/apiComments';

// Skapar Context för trådar och kommentarer
export const ThreadContext = createContext();

export function ThreadProvider({ children }) {
  const [threads, setThreads] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hämta alla trådar vid första renderingen
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

  // Lägg till en ny tråd i state
  const addNewThread = newThread => {
    console.log('✅ Adding new thread to state:', newThread);
    setThreads(prevThreads => [...prevThreads, newThread]);
  };

  // Hämta kommentarer för en specifik tråd
  const loadComments = async threadId => {
    try {
      console.log('🔄 Fetching comments for thread:', threadId);
      const data = await fetchCommentsByThreadId(threadId);

      if (data.comments) {
        setComments(prev => ({
          ...prev,
          [threadId]: data.comments, // Lagra kommentarer per tråd-ID
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
