/*Checks inputs and request to create thread/comment. Middleware is imported in the routes.js, 
it checks check if all required fields are present before it calls next () 
and move on to function createThread in forumController. Also cleaning up code in controllers*/

export const validateThreadFields = (req, res, next) => {
  const { title, content, category_id } = req.body;

  if (!title || !content || !category_id) {
    return res
      .status(400)
      .json({ error: 'Title, content, and category are required.' });
  }
  next(); //Move to the next function (the actual route)
};

export const validateCommentFields = (req, res, next) => {
  console.log('🔍 Incoming Request Details:');
  console.log('🔹 Method:', req.method);
  console.log('🔹 Headers:', req.headers);
  console.log('🔹 Body:', req.body); // ✅ Debugging request body
  const { content, username } = req.body;

  if (!content || !username) {
    console.error('❌ Missing content or username in request body');
    return res
      .status(400)
      .json({ error: 'Content and username are required.' });
  }

  console.log('✅ Comment validation passed');
  next();
};
