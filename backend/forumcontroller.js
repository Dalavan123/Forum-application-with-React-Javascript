// ########## Functions that handles HTTP API requests and responses with the client ##########

import {
  fetchCategories,
  fetchCategoryById,
  fetchThreadsByCategory,
  fetchThreadById,
  fetchCommentsByThread,
  fetchAllThreads,
  createUser,
  addNewComment,
  createNewThread,
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
  res.json({
    category_name: category.category_name || 'Unknown Category',
    threads,
  });
}

//Retrieve comments from database for a thread
export function getComments(req, res) {
  const { category_id, thread_id } = req.params;

  const thread = fetchThreadById(thread_id);
  if (!thread) {
    return res.status(404).json({ error: 'Thread not found' });
  }

  const comments = fetchCommentsByThread(thread_id, category_id) || [];

  res.json({ ThreadsTitle: thread.title, comments }); // ✅ Always return an array
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

//Get comments for a thread

export function getCommentsByThread(req, res) {
  const { thread_id } = req.params;

  const comments = fetchCommentsByThread(thread_id);
  if (!comments) {
    return res
      .status(404)
      .json({ error: 'No comments found for this thread.' });
  }

  res.json({ comments });
}

export function addComment(req, res) {
  const { thread_id } = req.params;
  const { content, username } = req.body;

  console.log('🔍 Received a request to add a comment!');
  console.log('Thread ID:', thread_id);
  console.log('Request Body:', req.body); // ✅ Log full request body

  if (!content || !username) {
    console.error('❌ Missing fields:', { content, username });
    return res
      .status(400)
      .json({ error: 'Content and username are required.' });
  }

  // Ensure the user exists or create them
  let user = createUser(username);
  if (!user) {
    return res.status(500).json({ error: 'Failed to create user.' });
  }

  // Add the comment
  const newComment = addNewComment(thread_id, user.user_id, content);
  if (!newComment) {
    return res.status(500).json({ error: 'Failed to add comment.' });
  }
  console.log('✅ Comment successfully added!');
  res
    .status(201)
    .json({ message: 'Comment added successfully', comment: newComment });
}

export function createThread(req, res) {
  const { title, content, category_id, username } = req.body;

  console.log('🔍 Received Thread Data:', req.body); // ✅ Log the incoming request data

  if (!title || !username || !category_id) {
    return res
      .status(400)
      .json({ error: 'Title, category, and username are required.' });
  }

  // Ensure user exists or create them
  let user = createUser(username);
  if (!user) {
    console.error('❌ Failed to create/find user.');
    return res.status(500).json({ error: 'Failed to create user.' });
  }

  try {
    const newThread = createNewThread(
      title,
      content,
      category_id,
      user.user_id
    );
    if (!newThread) {
      console.error('❌ Failed to insert thread into database.');
      return res.status(500).json({ error: 'Failed to create thread.' });
    }

    console.log('✅ Thread created successfully:', newThread);
    res
      .status(201)
      .json({ message: 'Thread created successfully', thread: newThread });
  } catch (error) {
    console.error('❌ Database Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
