import React from 'react';
import { ActionButton } from './buttonComponents/ActionButton';

export function ThreadActions({ onEdit, onDelete }) {
  return (
    <div className='thread-actions'>
      <ActionButton
        label='✏️ Edit Thread'
        onClick={onEdit}
        className='edit-thread-button'
      ></ActionButton>
      <ActionButton
        label='🗑️ Delete Thread'
        onClick={onDelete}
        className='delete-thread-button'
      ></ActionButton>
    </div>
  );
}
