// ########## Functions that handle HTTP API requests and responses with the client ##########

import {
  fetchCategories,
  fetchCategoryById,
  fetchThreadsByCategory,
  fetchThreadById,
  fetchCommentsByThread,
  fetchAllThreads,
  createUser,
  createNewComment, // ✅ Ensure correct function is used
  createNewThread,
  deleteThreadById,
  updateThreadById,
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

// Retrieve all threads from database
export function getThreads(req, res) {
  const { orderBy, order } = req.query;
  const threads = fetchAllThreads(orderBy, order);
  res.json(threads);
}

// Get a category and its threads by Category ID
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

// Retrieve comments from database for a thread
export function getComments(req, res) {
  const threadId = req.params.thread_id;
  console.log('🔄 Fetching comments for thread:', threadId);

  const thread = fetchThreadById(threadId);
  if (!thread) {
    return res.status(404).json({ error: 'Thread not found' });
  }

  const comments = fetchCommentsByThread(threadId);
  console.log('✅ Comments Fetched:', comments);
  res.json({ comments });
}

// Retrieve a single thread by ID
export function getThreadById(req, res) {
  const { category_id, thread_id } = req.params;

  const thread = fetchThreadById(thread_id);
  if (!thread) {
    return res.status(404).json({ error: 'Thread not found' });
  }

  if (thread.category_id != category_id) {
    return res
      .status(400)
      .json({ error: 'Thread does not belong to this category' });
  }

  res.json(thread);
}

// Get comments for a thread
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

// ✅ Corrected `addComment` function
export function addComment(req, res) {
  const { thread_id } = req.params;
  const { content, username } = req.body;

  console.log('✅ Received Comment Data:', req.body);

  if (!content || !username) {
    return res
      .status(400)
      .json({ error: 'Content and username are required.' });
  }

  // Ensure user exists or create them
  let user = createUser(username);
  if (!user) {
    return res.status(500).json({ error: 'Failed to create user.' });
  }

  try {
    const result = createNewComment(thread_id, user.user_id, content);
    console.log('✅ Comment Created:', result);

    if (!result || !result.lastInsertRowid) {
      return res.status(500).json({ error: 'Failed to retrieve comment ID.' });
    }

    res.status(201).json({
      message: 'Comment added successfully',
      comment: {
        comment_id: result.lastInsertRowid, // ✅ Ensure comment ID is included
        content,
        username,
        timestamp: new Date().toISOString(), // ✅ Include timestamp
      },
    });
  } catch (error) {
    console.error('❌ Database Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// ✅ Remove the duplicate addComment function (already fixed above)

// Create a new thread
export function createThread(req, res) {
  const { title, content, category_id, username } = req.body;

  console.log('Creating thread with data', req.body);

  if (!title || !username || !category_id) {
    console.error('❌ Missing fields:', { title, username, category_id });
    return res
      .status(400)
      .json({ error: 'Title, category, and username are required.' });
  }

  let user = createUser(username);
  if (!user) {
    return res.status(500).json({ error: 'Failed to create user.' });
  }

  try {
    const result = createNewThread(title, content, category_id, user.user_id);
    if (!result) {
      throw new Error('❌ Failed to insert thread into database.');
    }

    const newThread = {
      thread_id: result.lastInsertRowid,
      title,
      content,
      category_id,
      username,
    };

    console.log('✅ Thread created successfully:', newThread);

    res
      .status(201)
      .json({ message: 'Thread created successfully', thread: newThread });
  } catch (error) {
    console.error('❌ Database Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Delete a thread
export function deleteThread(req, res) {
  const { thread_id } = req.params;

  console.log('🗑️ Deleting thread with ID:', thread_id);

  const result = deleteThreadById(thread_id);
  if (!result.changes) {
    return res.status(404).json({ error: 'Thread not found' });
  }

  res.json({ message: 'Thread deleted successfully' });
}

// Update a thread
export function updateThread(req, res) {
  const { thread_id } = req.params;
  const { title, content } = req.body;

  console.log('✏️ Editing thread:', { thread_id, title, content });

  if (!title || !content) {
    return res.status(404).json({ error: 'Title and content are required.' });
  }

  const result = updateThreadById(thread_id, title, content);
  if (!result.changes) {
    return res
      .status(404)
      .json({ error: 'Thread not found or no changes made' });
  }

  res.json({ message: 'Thread updated successfully' });
}
