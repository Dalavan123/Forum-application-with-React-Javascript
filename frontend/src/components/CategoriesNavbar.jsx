import React, { useState, useEffect } from 'react';

export const CategoriesNavbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      });
  }, []);

  return (
    <ul className='categories-navbar'>
      {categories.length === 0 ? (
        <li>Loading...</li>
      ) : (
        categories.map(category =>
          category.category_id ? (
            <li key={category.category_id}>{category.category_name}</li>
          ) : null
        )
      )}
    </ul>
  );
};
