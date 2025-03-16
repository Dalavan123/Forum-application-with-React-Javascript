import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../api/apiCategories';
import { NavLink } from 'react-router-dom';

export const CategoriesNavbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log('🔍 Fetching categories...'); // ✅ Debugging
    fetchCategories()
      .then(data => {
        console.log('✅ Fetched categories:', data);
        setCategories(data);
      })
      .catch(error => console.error('❌ Error fetching categories:', error));
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
