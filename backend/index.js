import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const db = new Database('../forum.db');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

app.get('/categories', (req, res) => {
  // Retrieve categories from database
  const categories = db.prepare('SELECT * FROM categories').all();
  res.json(categories);
});

app.get('/categories/:category_id/threads', (req, res) => {
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
});

app.get('/categories/:category_id/threads/:threads_id/comments', (req, res) => {
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
});

app.put('/categories/:category_id/threads/:threads_id', (req, res) => {
  const category_id = req.params.category_id;
  const threads_id = req.params.threads_id;
  const thread = db
    .prepare('SELECT * FROM threads WHERE threads_id = ?')
    .get(threads_id);
  if (!thread) {
    res.status(404).send({ error: 'Thread not found' });
  } else {
    const updatedThread = {
      title: req.body.title,
      content: req.body.content,
    };
    db.prepare(
      'UPDATE threads SET title = ?, content = ? WHERE threads_id = ?'
    ).run(updatedThread.title, updatedThread.content, threads_id);
    res.json({ message: 'Thread updated successfully' });
  }
});

app.put(
  '/categories/:category_id/threads/:threads_id/comments/:comments_id',
  (req, res) => {
    const comments_id = req.params.comments_id;
    const comment = db
      .prepare('SELECT * FROM comments WHERE comments_id = ?')
      .get(comments_id);
    if (!comment) {
      res.status(404).send({ error: 'Comment not found' });
    } else {
      const updatedComment = {
        content: req.body.content,
      };
      db.prepare('UPDATE comments SET content = ? WHERE comments_id = ?').run(
        updatedComment.content,
        comments_id
      );
      res.json({ message: 'Comment updated successfully' });
    }
  }
);

app.delete('/categories/:category_id/threads/:threads_id', (req, res) => {
  const threads_id = req.params.threads_id;
  const thread = db
    .prepare('SELECT * FROM threads WHERE threads_id = ?')
    .get(threads_id);
  if (!thread) {
    res.status(404).send({ error: 'Thread not found' });
  } else {
    db.prepare('DELETE FROM threads WHERE threads_id = ?').run(threads_id);
    res.json({ message: 'Thread deleted successfully' });
  }
});

app.delete(
  '/categories/:category_id/threads/:threads_id/comments/:comments_id',
  (req, res) => {
    const comments_id = req.params.comments_id;
    const comment = db
      .prepare('SELECT * FROM comments WHERE comments_id = ?')
      .get(comments_id);
    if (!comment) {
      res.status(404).send({ error: 'Comment not found' });
    } else {
      db.prepare('DELETE FROM comments WHERE comments_id = ?').run(comments_id);
      res.json({ message: 'Comment deleted successfully' });
    }
  }
);

console.log('Starting server...');
app.listen(3000, () => {
  console.log('Listening to port 3000');
});
