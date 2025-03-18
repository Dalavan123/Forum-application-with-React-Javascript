// ########## Functions that handle HTTP API requests from forumRoutes and responses with client  ##########

import {
  fetchCategories,
  fetchCategoryById,
  fetchThreads,
  fetchThreadById,
  fetchCommentsByThread,
  createUser,
  addComment as addCommentToDatabase, //Renamed to avoid conflicts
  addThread,
  deleteThreadById,
  updateThreadById,
} from './forumModel.js';

// Home page
export function homePage(req, res) {
  res.send('Welcome to the backend server!');
}

// Retrieve categories from database
export function getCategories(req, res) {
  try {
    const categories = fetchCategories();

    if (!categories || categories.length === 0) {
      console.error('Categories not found in the database');
      {
        return res.status(404).send({ error: 'No categories found' });
      }
    }
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send({ error: 'Error fetching categories' });
  }
}

// Retrieve all threads from database
export function getThreads(req, res) {
  const { orderBy, order } = req.query;
  res.json(fetchThreads(orderBy, order));
}

// Retrieve threads for a specific category
export function getThreadsbyCategoryId(req, res) {
  const { category_id } = req.params;
  const { orderBy, order } = req.query;

  const category = fetchCategoryById(category_id);
  if (!category) {
    return res.status(404).send({ error: 'Category not found' });
  }

  res.json({
    category_name: category.category_name || 'Unknown Category',
    threads: fetchThreads(category_id, orderBy, order),
  });
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

//Add comment to a thread
export function addComment(req, res) {
  const { thread_id } = req.params;
  const { content, username } = req.body;

  // Ensure user exists or create them
  let user = createUser(username);
  if (!user) {
    return res.status(500).json({ error: 'Failed to create user.' });
  }

  try {
    const result = addCommentToDatabase(thread_id, user.user_id, content);
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Create a new thread
export function createThread(req, res) {
  const { title, content, category_id, username } = req.body;

  let user = createUser(username);
  if (!user) {
    return res.status(500).json({ error: 'Failed to create user.' });
  }

  try {
    const result = addThread(title, content, category_id, user.user_id);
    if (!result) {
      throw new Error('❌ Failed to insert thread into database.');
    }

    res.status(201).json({
      message: 'Thread created successfully',
      thread: {
        thread_id: result.lastInsertRowid,
        title,
        content,
        category_id,
        username,
      },
    });
  } catch (error) {
    console.error('❌ Database Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Delete a thread
export function deleteThread(req, res) {
  const { thread_id } = req.params;
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
