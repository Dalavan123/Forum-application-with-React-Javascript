import React, { useState, useEffect } from 'react';
import { ActionButton } from './buttonComponents/ActionButton';

export function ThreadForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim() || !username.trim() || !selectedCategory) {
      setError('All fields are required.');
      console.error('❌ Missing fields:', {
        title,
        content,
        selectedCategory,
        username,
      });
      return;
    }
    onSubmit({ title, content, category_id: selectedCategory, username });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Username:</label>
        <input
          type='text'
          value={username}
          onChange={e => {
            setUsername(e.target.value);
          }}
          required
        />
        <label>Title:</label>
        <input
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Category:</label>
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          required
        >
          <option value=''>Select a category</option>
          {categories.map(category => (
            <option key={category.category_id} value={category.category_id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Content (Optional):</label>
        <textarea value={content} onChange={e => setContent(e.target.value)} />
      </div>
      {/* Use Reusable Button Component */}
      <ActionButton
        label='+ Add New Thread'
        onClick={handleSubmit}
        className={'add-thread-button'}
      >
        Submit
      </ActionButton>
    </form>
  );
}
