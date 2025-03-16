import React from 'react';

export function ActionButton({ label, onClick, className }) {
  return (
    <button className={`action-button ${className}`} onClick={onClick}>
      {label}
    </button>
  );
}
