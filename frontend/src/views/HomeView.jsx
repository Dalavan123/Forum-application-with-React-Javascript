import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const HomeView = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/threads')
      .then(response => response.json())
      .then(data => setThreads(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Alla trådar</h1>
      <ul>
        {threads.map(thread => (
          <li key={thread.threads_id}>
            <Link
              to={`/categories/${thread.category_id}/threads/${thread.threads_id}`}
            >
              {thread.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
