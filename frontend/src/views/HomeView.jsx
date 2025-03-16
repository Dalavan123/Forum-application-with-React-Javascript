import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const HomeView = () => {
  const [threads, setThreads] = useState([]);
  const [sortBy, setSortBy] = useState('timestamp');
  const [order, setOrder] = useState('DESC');

  // Fetch threads with sorting
  useEffect(() => {
    fetch(`http://localhost:3000/threads?orderBy=${sortBy}&order=${order}`)
      .then(response => response.json())
      .then(data => setThreads(data))
      .catch(error => console.error('Error fetching threads:', error));
  }, [sortBy, order]);

  return (
    <div>
      {/* Sorting Controls */}
      <div>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value='timestamp'>Newest</option>
          <option value='username'>Username</option>
          <option value='num_comments'>Most Comments</option>
        </select>
        <button onClick={() => setOrder(order === 'DESC' ? 'ASC' : 'DESC')}>
          {order === 'DESC' ? 'Descending' : 'Ascending'}
        </button>
      </div>

      {/* Thread List */}
      <div>
        <h1>All Threads</h1>
        {threads.length === 0 ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : (
          <ul>
            {threads.map(thread => (
              <li
                key={`${thread.category_id}-${thread.thread_id}`}
                className='threads-and-comments-list'
              >
                <Link
                  to={`/categories/${thread.category_id}/threads/${thread.thread_id}`}
                >
                  {thread.title}
                </Link>

                <div className='timestamp-and-numofcomments'>
                  <span>Created by: {thread.username}</span>
                  <span>
                    Created at: {new Date(thread.timestamp).toLocaleString()}
                  </span>
                  <span>Replies: {thread.num_comments}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
