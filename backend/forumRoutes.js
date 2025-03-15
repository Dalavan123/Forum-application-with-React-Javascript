import express from 'express';

// Import the controller methods from blog.controller.js
import {
  homePage,
  getCategories,
  getThreadsbyCategoryId,
  getComments,
  getThreads,
  getThreadById,
} from './forumController.js';

export const routes = express.Router();

// ########## Endpoints ##########

routes.get('/', homePage);
routes.get('/categories', getCategories);
routes.get('/threads', getThreads);
routes.get('/categories/:category_id/threads', getThreadsbyCategoryId);
routes.get('/categories/:category_id/threads/:thread_id/comments', getComments);
routes.get('/categories/:category_id/threads/:thread_id', getThreadById);
