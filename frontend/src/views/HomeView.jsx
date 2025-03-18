import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchThreads } from '../api/apiThreads';

export const HomeView = () => {
  const [threads, setThreads] = useState([]);
  const [sortBy, setSortBy] = useState('timestamp');
  const [order, setOrder] = useState('DESC');

  useEffect(() => {
    console.log('useEffect called');
    fetchThreads(sortBy, order)
      .then(data => {
        console.log('fetchThreads returned data:', data);
        setThreads(data);
      })
      .catch(error => console.error(error));
  }, [sortBy, order, fetchThreads]);

  const handleSortByChange = e => {
    console.log('handleSortByChange called with value:', e.target.value);
    setSortBy(e.target.value);
  };

  const handleOrderChange = () => {
    console.log('handleOrderChange called');
    setOrder(order === 'DESC' ? 'ASC' : 'DESC');
  };

  console.log('Rendering component with state:', sortBy, order, threads);

  return (
    <div>
      {/* Sorting Controls */}
      <div>
        <select value={sortBy} onChange={handleSortByChange}>
          <option value='timestamp'>Newest</option>
          <option value='username'>Username</option>
          <option value='num_comments'>Most Comments</option>
        </select>
        <button onClick={handleOrderChange}>
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
