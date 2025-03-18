// ########## Get all the packages and data needed ##########

import express from 'express';

import cors from 'cors';

// ########## Import the Routes from file forumRoutes ##########

import { routes } from './forumRoutes.js';

// ########## Create the server, and configure it. ##########

// Creates the server by invoking the express function and assigning it to the app variable.
const app = express();

// Enable CORS
app.use(cors());

// Parse the body object so it's available on the req object.
app.use(express.json());

// ########## Endpoints ##########

app.use(routes);

//########## Starts the server ##########

console.log('Starting server...');
app.listen(3000, () => {
  console.log('Listening to port 3000');
});

