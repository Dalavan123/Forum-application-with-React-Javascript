import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CommentList } from '../components/CommentList';
import { CommentForm } from '../components/CommentForm';
import { ThreadContext } from '../context/ThreadContext';
import { deleteThread, updateThread } from '../api/apiThreads';
import { addComment } from '../api/apiComments';
<api></api>;
import { ThreadActions } from '../components/ThreadActions';

export function ThreadDetailsView() {
  const { category_id, thread_id } = useParams();
  const navigate = useNavigate();
  const { threads, comments, loadComments, setThreads, setComments } =
    useContext(ThreadContext);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [message, setMessage] = useState(''); //state for success message

  // Find thread from Context
  const thread = threads.find(t => t.thread_id === Number(thread_id));

  useEffect(() => {
    if (!thread_id) return;

    console.log('🔄 Fetching comments for thread:', thread_id);
    loadComments(thread_id); // ✅ Ensure comments are fetched when the component loads
  }, [thread_id]); // ✅ Add `comments` dependency to trigger re-render

  // Handle deleting a thread
  const handleDeleteThread = async () => {
    console.log('🗑️ Deleting thread:', thread_id);
    try {
      await deleteThread(thread_id);
      setThreads(prev => prev.filter(t => t.thread_id !== Number(thread_id)));
      navigate(`/categories/${category_id}`);
    } catch (error) {
      console.error('Error deleting thread:', error);
    }
  };

  // Enable Edit Mode
  const enableEdit = () => {
    setEditMode(true);
    setEditedTitle(thread.title);
    setEditedContent(thread.content);
  };

  // Handle updating a thread
  const handleUpdateThread = async () => {
    console.log('✏️ Updating thread:', thread_id);
    try {
      await updateThread(thread_id, {
        title: editedTitle,
        content: editedContent,
      });
      setThreads(prev =>
        prev.map(t =>
          t.thread_id === Number(thread_id)
            ? { ...t, title: editedTitle, content: editedContent }
            : t
        )
      );
      setEditMode(false);
      setMessage('Thread updated successfully');
      setTimeout(() => setMessage(''), 2000); //Hide message after 2 sec
    } catch (error) {
      console.error('Error updating thread:', error);
      setMessage('Failed to update thread');
    }
  };

  if (!thread) return <h1>Thread Not Found</h1>;

  return (
    <div>
      {/* Success Message UI */}
      {message && <div className='success-message'>{message}</div>}

      {editMode ? (
        <div>
          <input
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedContent}
            onChange={e => setEditedContent(e.target.value)}
          />
          <button onClick={handleUpdateThread}>Save Changes</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <h1>{thread.title}</h1>
          <p>{thread.content}</p>
          <p>Created by: {thread.username}</p>
          <p>Posted on: {new Date(thread.timestamp).toLocaleString()}</p>
          <ThreadActions onEdit={enableEdit} onDelete={handleDeleteThread} />
        </>
      )}

      <CommentList comments={comments[thread_id] || []} />
      <CommentForm
        onSubmit={async newComment => {
          try {
            const response = await addComment(thread_id, newComment);
            console.log('✅ API Response from addComment:', response); // ✅ Debugging

            if (!response.comment || !response.comment.comment_id) {
              console.error('❌ Comment ID is missing in API response.');
              return;
            }

            setComments(prev => ({
              ...prev,
              [thread_id]: [
                ...(prev[thread_id] || []), // ✅ Ensures prev[thread_id] is never undefined
                {
                  comment_id: response.comment.comment_id, // ✅ Ensures new comment gets a valid ID
                  username: newComment.username,
                  content: newComment.content || newComment.commentText, // ✅ Ensures content is valid
                  timestamp: new Date().toISOString(),
                },
              ],
            }));
          } catch (error) {
            console.error('Error adding comment:', error);
          }
        }}
      />
    </div>
  );
}
