import React from 'react';
import { Link } from 'react-router-dom';

export function ThreadList({ category_id, threads }) {
  return (
    <ul>
      {threads.length === 0 ? (
        <p>No threads found in this category.</p>
      ) : (
        threads.map(thread => (
          <li key={thread.thread_id} className='threads-and-comments-list'>
            <Link to={`/categories/${category_id}/threads/${thread.thread_id}`}>
              {thread.title}
            </Link>
            <div className='timestamp-and-numofcomments'>
              <span>Posted by: {thread.username}</span>
              <span>
                Created at: {new Date(thread.timestamp).toLocaleString()}
              </span>
              <span>Replies: {thread.num_comments}</span>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
