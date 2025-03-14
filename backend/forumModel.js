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

export function fetchThreads() {
  return db.prepare(`SELECT * FROM threads`).all();
}

//Get threads for a specific category
export function fetchThreadsByCategory(categoryId) {
  return db
    .prepare(
      `
        SELECT t.*,u.username FROM threads t JOIN users u ON t.users_id = u.users_id WHERE t.category_id = ?`
    )
    .all(categoryId);
}

//Get a thread by ID
export function fetchThreadById(threadId) {
  return db.prepare(`SELECT * FROM threads WHERE threads_id = ?`).get(threadId);
}

// Get comments for a specific thread
export function fetchCommentsByThread(threadId) {
  return db
    .prepare(
      `SELECT c.*, u.username
        FROM comments c
        JOIN users u ON c.users_id = u.users_id
        WHERE c.threads_id = ?`
    )
    .all(threadId);
}
