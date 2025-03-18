import React, { useEffect } from 'react';

export function SortingControls({ sortBy, setSortBy, order, setOrder }) {
  useEffect(() => {
    console.log('✅ SortingControls Mounted - Current sortBy:', sortBy); // ✅ Debugging on mount
  }, [sortBy]);

  const handleSortChange = e => {
    const newSort = e.target.value;
    console.log('🔄 Sorting changed to:', e.target.value); // ✅ Debugging
    setSortBy(newSort);
  };

  const toggleOrder = () => {
    const newOrder = order === 'DESC' ? 'ASC' : 'DESC';
    console.log('🔄 Order changed to:', newOrder); // ✅ Debugging
    setOrder(newOrder);
  };

  return (
    <div>
      <label>Sort by:</label>
      <select value={sortBy} onChange={handleSortChange}>
        <option value='timestamp'>Newest</option>
        <option value='username'>Username</option>
        <option value='num_comments'>Most Comments</option>
      </select>
      <button onClick={toggleOrder}>
        {order === 'DESC' ? 'Descending' : 'Ascending'}
      </button>
    </div>
  );
}
