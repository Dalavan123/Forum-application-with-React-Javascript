import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function ThreadsView() {
  const { category_id } = useParams();
  const [categoryName, setCategoryName] = useState('');
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
      <h1>{categoryName}</h1>
      {threads.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {threads.map(thread => (
            <li key={thread.threads_id}>{thread.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
