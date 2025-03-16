import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export function CategoryDetailsView() {
  const { category_id } = useParams();
  const [category_name, setCategoryName] = useState('');
  const [threads, setThreads] = useState([]);

  const [sortBy, setSortBy] = useState('timestamp');
  const [order, setOrder] = useState('DESC');

  useEffect(() => {
    const apiUrl = `http://localhost:3000/categories/${category_id}/threads?orderBy=${sortBy}&order=${order}`;
    console.log('Fetching threads from:', apiUrl); // ✅ Debugging

    fetch(apiUrl)
      .then(response => response.json()) // ✅ Fix: Return the parsed JSON
      .then(data => {
        console.log('API Response in Frontend:', data); // ✅ Now it should log the correct response
        if (!data || typeof data !== 'object' || !data.category_name) {
          console.error('Invalid API response:', data);
          return;
        }
        setCategoryName(data.category_name);
        setThreads(Array.isArray(data.threads) ? data.threads : []); // ✅ Ensure `threads` is always an array
      })
      .catch(error => console.error('Error fetching threads:', error));
  }, [category_id, sortBy, order]);

  return (
    <div>
      <h1>{category_name || 'Loading Category...'}</h1>

      {/* Sorting Controls */}
      <div>
        <label>Sorty by:</label>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value='timestamp'>Newest</option>{' '}
          <option value='username'>Username</option>{' '}
          <option value='num_comments'>Most Comments</option>
        </select>
        <button onClick={() => setOrder(order === 'DESC' ? 'ASC' : 'DESC')}>
          {order === 'DESC' ? 'Descending' : 'Ascending'}
        </button>
      </div>
      {threads.length === 0 ? (
        <p>No threads found in this category.</p>
      ) : (
        <ul>
          {threads.map(thread => (
            <li key={thread.thread_id} className='threads-and-comments-list'>
              <Link
                to={`/categories/${category_id}/threads/${thread.thread_id}`}
              >
                {thread.title}
              </Link>
              <div className='timestamp-and-numofcomments'>
                <span>Posted by: {thread.username}</span>{' '}
                <span>Created at: {thread.timestamp}</span>
                <span>Replies: {thread.num_comments}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
