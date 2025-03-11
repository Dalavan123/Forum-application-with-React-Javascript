import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

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
            <li key={category.category_id}>
              <NavLink
                to={`/categories/${category.category_id}/threads`}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                {category.category_name}
              </NavLink>
            </li>
          ) : null
        )
      )}
    </ul>
  );
};
