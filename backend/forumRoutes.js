import express from 'express';

// Import the controller methods from blog.controller.js
import {
  homePage,
  getCategories,
  getThreadsbyCategoryId,
  getComments,
  getThreads,
  getThreadById,
  getCommentsByThread,
  createThread,
  addComment,
} from './forumController.js';

export const routes = express.Router();

// ########## GET - Endpoints ##########

routes.get('/', homePage);
routes.get('/categories', getCategories);
routes.get('/threads', getThreads);
routes.get('/categories/:category_id/threads', getThreadsbyCategoryId);
routes.get('/categories/:category_id/threads/:thread_id/comments', getComments);
routes.get('/categories/:category_id/threads/:thread_id', getThreadById);
routes.get('/threads/:thread_id/comments', getCommentsByThread);

// ########## POST - Endpoints ##########
routes.post('/threads', createThread);
routes.post('/threads/:thread_id/comments', addComment);

// ########## DELETE - Endpoints ##########

// ########## PUT - Endpoints ##########
