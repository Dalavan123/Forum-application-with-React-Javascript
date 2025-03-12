import React, { useState } from 'react';

const ActionButton = ({ type, id, action, category_id, onClick }) => {
  console.log('category_id:', category_id);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleClick = async () => {
    if (action === 'edit') {
      const response = await fetch(
        `http://localhost:3000/categories/${category_id}/threads/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title,
            content: content,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
    } else if (action === 'delete') {
      const response = await fetch(
        `http://localhost:3000/categories/${category_id}/threads/${id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await response.json();
      console.log(data);
    }
    onClick(type, id, action);
  };

  if (action === 'edit') {
    return (
      <div>
        <input
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='Enter new title'
        />
        <button onClick={handleClick}>Edit</button>
      </div>
    );
  } else if (action === 'delete') {
    return (
      <div>
        <button onClick={handleClick}>Delete</button>
      </div>
    );
  } else {
    return <div>Action not recognized</div>;
  }
};

export default ActionButton;
