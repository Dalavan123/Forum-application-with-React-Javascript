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
  const { orderBy, order } = req.query;
  const threads = fetchAllThreads(orderBy, order);
  res.json(threads);
}

//Get a category and its threads by Category ID
export function getThreadsbyCategoryId(req, res) {
  const { category_id } = req.params;
  const { orderBy, order } = req.query;
  const category = fetchCategoryById(category_id);

  if (!category) {
    return res.status(404).send({ error: 'Category not found' });
  }

  const threads = fetchThreadsByCategory(category_id, orderBy, order);
  res.json({ category_name: category.category_name, threads });
}

//Retrieve comments from database for a thread
export function getComments(req, res) {
  const { category_id, thread_id } = req.params;

  const thread = fetchThreadById(thread_id);
  if (!thread) {
    return res.status(404).json({ error: 'Thread not found' });
  }

  // Pass category_id to the fetch function
  const comments = fetchCommentsByThread(thread_id, category_id);
  if (!comments || comments.length === 0) {
    return res.status(404).json({ error: 'No comments found for this thread' });
  }

  res.json({ ThreadsTitle: thread.title, comments });
}

// Retrieve a single thread by ID
export function getThreadById(req, res) {
  const { category_id, thread_id } = req.params;

  // Fetch the thread
  const thread = fetchThreadById(thread_id);

  if (!thread) {
    return res.status(404).json({ error: 'Thread not found' });
  }

  // Ensure the thread belongs to the correct category
  if (thread.category_id != category_id) {
    return res
      .status(400)
      .json({ error: 'Thread does not belong to this category' });
  }

  res.json(thread);
}
