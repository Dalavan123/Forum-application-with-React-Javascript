import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ActionButton from '../components/ActionButton';

export function CategoryDetailsView() {
  const { category_id } = useParams();
  const [category_name, setCategoryName] = useState('');
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/categories/${category_id}/threads`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setCategoryName(data.category_name);
        setThreads(data.threads);
        console.log('Threads:', threads);
      });
  }, [category_id]);

  return (
    <div>
      {category_name && <h1>{category_name}</h1>}
      {threads.length > 0 && (
        <ul>
          {threads.map(thread => (
            <li key={thread.threads_id}>
              <Link
                to={`/categories/${category_id}/threads/${thread.threads_id}`}
              >
                {thread.title}
              </Link>
              <p>Posted by {thread.username}</p>
              <ActionButton
                type='thread'
                id={thread.threads_id}
                action='edit'
                category_id={category_id}
              />
              <ActionButton
                type='thread'
                id={thread.threads_id}
                action='delete'
                category_id={category_id}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
