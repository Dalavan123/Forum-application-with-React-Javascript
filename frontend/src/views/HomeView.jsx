import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

export const HomeView = () => {
  const [threads, setThreads] = useState([]);
  const [orderBy, setOrderBy] = useState('timestamp DESC');

  useMemo(() => {
    fetch('http://localhost:3000/threads')
      .then(response => response.json())
      .then(data => setThreads(data))
      .catch(error => console.error(error));
  }, []);

  const sortedThreads = useMemo(() => {
    return threads.sort((a, b) => {
      if (orderBy === 'timestamp DESC') {
        return b.timestamp - a.timestamp;
      } else {
        return a.timestamp - b.timestamp;
      }
    });
  }, [orderBy, threads]);

  const toggleOrderBy = () => {
    setOrderBy(
      orderBy === 'timestamp DESC' ? 'timestamp ASC' : 'timestamp DESC'
    );
  };

  return (
    <div>
      <h1>Alla trådar</h1>
      <button onClick={toggleOrderBy}>Toggle Order</button>
      <ul>
        {sortedThreads.map(thread => (
          <li className='threads-and-comments-list' key={thread.threads_id}>
            <Link
              to={`/categories/${thread.category_id}/threads/${thread.threads_id}`}
            >
              {thread.title}
            </Link>
            <div className='timestamp-and-numofcomments'>
              <span>
                Created at: {new Date(thread.timestamp).toLocaleString()}
              </span>
              <span>Replies: {thread.num_comments}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
