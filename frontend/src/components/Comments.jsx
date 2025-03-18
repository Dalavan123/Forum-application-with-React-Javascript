//Hämtar kommentarerna från API-fetch, sparar de i lokalt state och hanterar laddning
//Renderar sedan kommentarna

import React, { useState, useEffect } from 'react';

export const Comments = ({ category_id, thread_id }) => {
  //State för att hålla kommentarer och laddningsstatus
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Effekt som körs när thread_id eller category_id ändras
  useEffect(() => {
    const fetchComments = async () => {
      if (!thread_id) return; // don't make API call if threads_id is empty
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/categories/${category_id}/threads/${thread_id}/comments`
      );
      const data = await response.json();
      console.log('API response:', data); // Debugga API-svaret
      setComments(data.comments);
      setLoading(false); // Stäng av laddningsstatus
    };
    fetchComments();
  }, [thread_id, category_id]); // Kör igen när dessa ändras

  const editComment = () => {
    // Handle edit comment logic here
  };

  return (
    <div>
      {/* Visa laddningsmeddelande om kommentarer hämtas */}
      {loading ? (
        <p>Loading comments...</p>
      ) : Array.isArray(comments) ? (
        comments.map(comment => (
          <div key={comment.comment_id}>
            <p>Posted by {comment.username}</p>
            <p>{comment.content}</p>
          </div>
        ))
      ) : (
        <p>No comments found.</p>
      )}
    </div>
  );
};
