// ########## Get all the packages and data needed ##########

import express from 'express';

import cors from 'cors';
import fetch from 'node-fetch';

// ########## Create the server, and configure it. ##########

// Creates the server by invoking the express function and assigning it to the app variable.
const app = express();

// Enable CORS
app.use(cors());

// Previously we used app.use but now cors because....
// Parse the body object so it's available on the req object.
//app.use(express.json());

// Import the controller methods from blog.controller.js
import {
  homePage,
  getCategories,
  getThreads,
  getComments,
} from './forumcontroller.js';

// ########## Endpoints ##########
app.get('/', homePage);
app.get('/categories', getCategories);
app.get('/categories/:category_id/threads', getThreads);
app.get('/categories/:category_id/threads/:threads_id/comments', getComments);

//########## Starts the server ##########

console.log('Starting server...');
app.listen(3000, () => {
  console.log('Listening to port 3000');
});

/* app.put('/categories/:category_id/threads/:threads_id', (req, res) => {
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
); */
