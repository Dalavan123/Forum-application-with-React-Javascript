/*Checks inputs and request to create thread/comment. Middleware is imported in the routes.js, 
it checks check if all required fields are present before it calls next () 
and move on to function createThread in forumController. Also cleaning up code in controllers*/

export const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
};
