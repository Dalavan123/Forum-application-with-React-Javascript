import React from 'react';

export function SortingControls({ sortBy, setSortBy, order, setOrder }) {
  return (
    <div>
      <label>Sort by:</label>
      <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
        <option value='timestamp'>Newest</option>
        <option value='username'>Username</option>
        <option value='num_comments'>Most Comments</option>
      </select>
      <button onClick={() => setOrder(order === 'DESC' ? 'ASC' : 'DESC')}>
        {order === 'DESC' ? 'Descending' : 'Ascending'}
      </button>
    </div>
  );
}
