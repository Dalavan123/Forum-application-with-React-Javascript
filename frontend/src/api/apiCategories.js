//Hanterar API-anrop relaterade till kategorier.
//Använder apiRequest för att hämta data från backend och hanterar felloggning.

import { apiRequest } from './apiRequest';

const BASE_URL = 'http://localhost:3000/categories';

export const fetchCategories = async () => {
  return await apiRequest(BASE_URL, {}, 'Failed to fetch categories');
};

export const fetchCategoryById = async categoryId => {
  const url = `${BASE_URL}/${categoryId}`;
  return await apiRequest(url, {}, 'Failed to fetch category');
};
