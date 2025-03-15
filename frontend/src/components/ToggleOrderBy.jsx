export function ToggleOrderBy({ orderBy, toggleOrderBy }) {
  return (
    <button onClick={toggleOrderBy}>
      {orderBy === 'timestamp DESC' ? 'Sort by oldest' : 'Sort by newest'}
    </button>
  );
}
