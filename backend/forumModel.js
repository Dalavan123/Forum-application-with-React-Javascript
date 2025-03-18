// ########## Handles interactions/logic with the database - queries ##########

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
    .prepare('SELECT * FROM categories WHERE category_id = ? LIMIT 1')
    .get(categoryId);
}

// Fetch threads by category with sorting
export function fetchThreads({
  categoryId = null,
  orderBy = 'timestamp',
  order = 'DESC',
}) {
  const validColumns = ['username', 'timestamp', 'num_comments'];
  if (!validColumns.includes(orderBy)) orderBy = 'timestamp'; // Prevent SQL injection

  let query = `SELECT t.*, u.username, COUNT(c.comment_id) AS num_comments
    FROM threads t
    JOIN users u ON t.user_id = u.user_id
    LEFT JOIN comments c ON t.thread_id = c.thread_id`;

  const params = [];

  if (categoryId) {
    query += ' WHERE t.category_id = ?';
    params.push(categoryId);
  }

  query += ' GROUP BY t.thread_id ORDER BY ' + orderBy + ' ' + order;

  return db.prepare(query).all(...params);
}

//Get a thread by ID
export function fetchThreadById(threadId) {
  return db
    .prepare(
      `SELECT t.*, u.username 
    FROM threads t
    JOIN users u ON t.user_id = u.user_id 
    WHERE thread_id = ?
    LIMIT 1`
    )
    .get(threadId);
}

// Get comments for a specific thread
export function fetchCommentsByThread(threadId) {
  return db
    .prepare(
      `SELECT c.comment_id, c.content, c.timestamp, u.username 
     FROM comments c 
     JOIN users u ON c.user_id = u.user_id 
     WHERE c.thread_id = ? 
     ORDER BY c.timestamp DESC`
    )
    .all(threadId);
}

export function createUser(username) {
  const existingUser = db
    .prepare('SELECT * FROM users WHERE username = ?')
    .get(username);
  if (existingUser) return existingUser;

  const result = db
    .prepare('INSERT INTO users (username) VALUES (?)')
    .run(username);
  return result ? { user_id: result.lastInsertRowid, username } : null;
}

export function addThread(title, content, categoryId, userId) {
  return db
    .prepare(
      `INSERT INTO threads (title, content, category_id, user_id, timestamp) 
    VALUES (?, ?, ?, ?, datetime('now'))`
    )
    .run(title, content, categoryId, userId);
}

export function deleteThreadById(threadId) {
  return db.prepare('DELETE FROM threads WHERE thread_id = ?').run(threadId);
}

export function updateThreadById(threadId, title, content) {
  return db
    .prepare('UPDATE threads SET title=?, content=? WHERE thread_id = ?')
    .run(title, content, threadId);
}

// Add a new comment
export function addComment(threadId, userId, content) {
  return db
    .prepare(
      `INSERT INTO comments (thread_id, user_id, content, timestamp) 
     VALUES (?, ?, ?, datetime('now'))`
    )
    .run(threadId, userId, content);
}
