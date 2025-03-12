// Import the database class from better-sqlite3
import Database from 'better-sqlite3';
const db = new Database('../forum.db');

// ########## Functions to connect to the API and the database forum.db ##########

// Home page
export function homePage(req, res) {
  res.send('Welcome to the backend server!');
}

// Retrieve categories from database
export function getCategories(req, res) {
  const categories = db.prepare('SELECT * FROM categories').all();
  res.json(categories);
}

// Retrieve threads from database
export function getThreads(req, res) {
  const categoryId = req.params.category_id;
  const category = db
    .prepare('SELECT * FROM categories WHERE category_id = ?')
    .get(categoryId);
  if (!category) {
    res.status(404).send({ error: 'Category not found' });
  } else {
    const threads = db
      .prepare(
        `
          SELECT t.*, u.username
          FROM threads t
          JOIN users u ON t.users_id = u.users_id
          WHERE t.category_id = ?
        `
      )
      .all(categoryId);
    res.json({ category_name: category.category_name, threads });
  }
}

// Retrieve comments from database
export function getComments(req, res) {
  const threads_id = req.params.threads_id;
  const thread = db
    .prepare('SELECT * FROM threads WHERE threads_id = ?')
    .get(threads_id);
  if (!thread) {
    res.status(404).send({ error: 'Thread not found' });
  } else {
    const comments = db
      .prepare(
        `
          SELECT c.*, u.username
          FROM comments c
          JOIN users u ON c.users_id = u.users_id
          WHERE c.threads_id = ?
        `
      )
      .all(threads_id);
    if (!comments) {
      res.status(404).send({ error: 'Comments not found' });
    } else {
      res.json({ ThreadsTitle: thread.title, comments });
    }
  }
}
