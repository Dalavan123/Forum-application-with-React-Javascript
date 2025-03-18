import express from 'express';

import {
  homePage,
  getCategories,
  getThreadsbyCategoryId,
  getThreads,
  getThreadById,
  getCommentsByThread,
  addComment,
  createThread,
  deleteThread,
  updateThread,
} from './forumController.js';

import {
  validateThreadFields,
  validateCommentFields,
} from './middleware/validationMiddleware.js';

export const routes = express.Router();

// ########## General routes ##########
routes.get('/', homePage);
routes.get('/categories', getCategories);

// ########## Threads routes ##########
routes.get('/threads', getThreads);
routes.get('/categories/:category_id/threads', getThreadsbyCategoryId);
routes.get('/categories/:category_id/threads/:thread_id', getThreadById);

// ########## Comments routes ##########
routes.get('/threads/:thread_id/comments', getCommentsByThread);
routes.post('/threads/:thread_id/comments', validateCommentFields, addComment);

// ########## Thread Actions (Create, Update, Delete part of CRUD) ##########
routes.post('/threads', validateThreadFields, createThread);
routes.put('/threads/:thread_id', updateThread);
routes.delete('/threads/:thread_id', deleteThread);
