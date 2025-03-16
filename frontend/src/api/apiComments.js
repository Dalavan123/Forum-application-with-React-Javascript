import { apiRequest } from './apiRequest';

const BASE_URL = 'http://localhost:3000/threads';

export const fetchCommentsByThreadId = async threadId => {
  const url = `${BASE_URL}/${threadId}/comments`;
  return await apiRequest(url, {}, 'Failed to fetch comments');
};

export const addComment = async (threadId, newComment) => {
  const url = `${BASE_URL}/${threadId}/comments`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: newComment.commentText, // ✅ Match backend field name
      username: newComment.username, // ✅ Match backend field name
    }),
  };
  return await apiRequest(url, options, 'Failed to add comment');
};
