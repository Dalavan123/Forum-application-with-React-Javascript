// ########## Functions that handles HTTP API requests and responses with the client ##########

import {
  fetchCategories,
  fetchCategoryById,
  fetchThreadsByCategory,
  fetchThreadById,
  fetchCommentsByThread,
  fetchAllThreads,
} from './forumModel.js';

// Home page
export function homePage(req, res) {
  res.send('Welcome to the backend server!');
}

// Retrieve categories from database
export function getCategories(req, res) {
  const categories = fetchCategories();
  res.json(categories);
}

//Retrive all threads from database
export function getThreads(req, res) {
  const threads = fetchAllThreads();
  res.json(threads);
}

//Get a category and its threads by Category ID
export function getThreadsbyCategoryId(req, res) {
  const categoryId = req.params.category_id;
  const category = fetchCategoryById(categoryId);

  if (!category) {
    return res.status(404).send({ error: 'Category not found' });
  }

  const threads = fetchThreadsByCategory(categoryId);
  res.json({ category_name: category.category_name, threads });
}

//Retrieve comments from database for a thread
export function getComments(req, res) {
  const threadId = req.params.threads_id;
  const thread = fetchThreadById(threadId);

  if (!thread) {
    return res.status(404).send({ error: 'Thread not found' });
  }

  const comments = fetchCommentsByThread(threadId);
  if (!comments || comments.length === 0) {
    return res.status(404).send({ error: 'Comments not found' });
  }

  res.json({ ThreadsTitle: thread.title, comments });
}
