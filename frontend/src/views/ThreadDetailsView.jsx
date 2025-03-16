import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CommentList } from '../components/CommentList';
import { CommentForm } from '../components/CommentForm';
import { ThreadContext } from '../context/ThreadContext';
import { addComment } from '../api/apiComments';
import { ThreadActions } from '../components/ThreadActions';

export function ThreadDetailsView() {
  const { category_id, thread_id } = useParams();
  const { threads, comments, loadComments, setComments, loading, error } =
    useContext(ThreadContext);

  //Find the current thread from context
  const thread = threads.find(thread => thread.thread_id === Number(thread_id));

  useEffect(() => {
    if (!thread_id) return;
    loadComments(thread_id); //Load comments when component mounts
  }, [thread_id]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  // Handle adding a new comment
  const handleCommentSubmit = async newComment => {
    console.log('🔍 Sending Comment:', newComment); // ✅ Log the request body
    try {
      await addComment(thread_id, newComment);
      setComments(prev => ({
        ...prev,
        [thread_id]: [
          ...prev[thread_id],

          {
            username: newComment.username,
            content: newComment.commentText,
            timestamp: new Date().toISOString(),
          },
        ],
      }));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      {/* Display Thread Title */}
      <h1>{thread ? thread.title : 'Thread Not Found'}</h1>
      <p>{thread ? thread.content : 'Loading...'}</p>
      <p>Created by: {thread ? thread.username : 'Loading...'}</p>
      <p>
        Posted on:
        {thread ? new Date(thread.timestamp).toLocaleString() : 'Loading...'}
      </p>

      {/* Thread Edit & Delete Buttons */}
      <ThreadActions
        onEdit={() => console.log('Edit thread')}
        onDelete={() => console.log('Delete thread')}
      />

      {/* Display Comments */}
      <CommentList comments={comments[thread_id] || []} />

      {/* Add a New Comment */}
      <CommentForm onSubmit={handleCommentSubmit} />
    </div>
  );
}
