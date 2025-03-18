import { apiRequest } from './apiRequest';

const BASE_URL = 'http://localhost:3000/threads';

export const fetchThreads = async (sortBy, order) => {
  const url = `${BASE_URL}?orderBy=${sortBy}&order=${order}`;
  return await apiRequest(url, {}, 'Failed to fetch threads');
};

export const fetchThreadById = async threadId => {
  const url = `${BASE_URL}/${threadId}`;
  return await apiRequest(url, {}, 'Thread not found');
};

export const createThread = async newThread => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newThread),
  };
  return await apiRequest(BASE_URL, options, 'Failed to create thread');
};

export const deleteThread = async threadId => {
  const url = `${BASE_URL}/${threadId}`; // ✅ Ensure the correct API URL
  const options = { method: 'DELETE' };
  await apiRequest(url, options, 'Failed to delete thread');
};

export const updateThread = async (threadId, updateData) => {
  const url = `${BASE_URL}/${threadId}`;
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updateData),
  };
  return await apiRequest(url, options, 'Failed to updated thread');
};
