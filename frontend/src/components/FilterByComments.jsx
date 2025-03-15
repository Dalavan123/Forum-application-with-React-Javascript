function FilterByComments({ minComments, handleMinCommentsChange }) {
  return (
    <div>
      <input
        type='number'
        value={minComments}
        onChange={handleMinCommentsChange}
      />
      <label>Minimum comments:</label>
    </div>
  );
}
