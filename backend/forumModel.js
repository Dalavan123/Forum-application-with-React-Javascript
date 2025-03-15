// ########## Handles interactions with the database - queries ##########

// Import the database class from better-sqlite3
import Database from 'better-sqlite3';
const db = new Database('../forum.db');

// Get all categories
export function fetchCategories() {
  return db.prepare('SELECT * FROM categories').all();
}

//Get a category by ID
export function fetchCategoryById(categoryId) {
  return db
    .prepare('SELECT * FROM categories WHERE category_id = ?')
    .get(categoryId);
}

// Fetch all threads with sorting
export function fetchAllThreads(orderBy = 'timestamp', order = 'DESC') {
  const validColumns = ['username', 'timestamp', 'num_comments'];
  if (!validColumns.includes(orderBy)) {
    orderBy = 'timestamp'; // Default to sorting by timestamp
  }

  return db
    .prepare(
      `
    SELECT t.*, u.username, COUNT(c.comment_id) as num_comments
    FROM threads t
    JOIN users u ON t.user_id = u.user_id
    LEFT JOIN comments c ON t.thread_id = c.thread_id
    GROUP BY t.thread_id
    ORDER BY ${orderBy} ${order}
  `
    )
    .all();
}

// Fetch threads by category with sorting
export function fetchThreadsByCategory(
  categoryId,
  orderBy = 'timestamp',
  order = 'DESC'
) {
  const validColumns = ['username', 'timestamp', 'num_comments'];
  if (!validColumns.includes(orderBy)) {
    orderBy = 'timestamp'; // Default sorting
  }

  return db
    .prepare(
      `
    SELECT t.*, u.username, COUNT(c.comment_id) as num_comments
    FROM threads t
    JOIN users u ON t.user_id = u.user_id
    LEFT JOIN comments c ON t.thread_id = c.thread_id
    WHERE t.category_id = ?
    GROUP BY t.thread_id
    ORDER BY ${orderBy} ${order}
  `
    )
    .all(categoryId);
}

//Get a thread by ID
export function fetchThreadById(threadId) {
  return db.prepare(`SELECT * FROM threads WHERE thread_id = ?`).get(threadId);
}

// Get comments for a specific thread
export function fetchCommentsByThread(threadId) {
  return db
    .prepare(
      `SELECT c.*, u.username
      FROM comments c
      JOIN users u ON c.user_id = u.user_id
      WHERE c.thread_id = ?`
    )
    .all(threadId); // Only pass `threadId`
}
