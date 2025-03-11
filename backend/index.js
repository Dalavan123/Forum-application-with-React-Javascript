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
  // Retrieve threads from database
  const categoryId = req.params.category_id;
  const category = db
    .prepare('SELECT * FROM categories WHERE category_id = ?')
    .get(categoryId);
  if (!category) {
    res.status(404).send({ error: 'Category not found' });
  } else {
    const threads = db
      .prepare('SELECT * FROM threads WHERE category_id = ?')
      .all(categoryId);
    res.json({ category_name: category.category_name, threads });
  }
});

console.log('Starting server...');
app.listen(3000, () => {
  console.log('Listening to port 3000');
});
