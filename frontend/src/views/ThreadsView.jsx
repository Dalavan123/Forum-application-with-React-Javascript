import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function ThreadsView() {
  const { category_id } = useParams();
  const [category, setCategory] = useState({});
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/categories/${category_id}/threads`)
      .then(response => response.json())
      .then(data => {
        setCategory({ name: data.category_name });
        setThreads(data.threads);
      });
  }, [category_id]);

  return (
    <div>
      <h1>{category.name}</h1>
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
