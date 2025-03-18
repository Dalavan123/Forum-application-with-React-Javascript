import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../api/apiCategories';
import { NavLink } from 'react-router-dom';

export const CategoriesNavbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    //Useeffect körs i början för att hämta kategorier från API
    fetchCategories() //fetchCategories en funktion som hämtar kategorier från backend query
      .then(data => {
        console.log('✅ Fetched categories:', data);
        setCategories(data); //Uppdaterar statet ovan med hämtade kategorier
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
              <NavLink //NavLink från react-router-dom och skapar en markerad/klickbar link till kategorisidan
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
