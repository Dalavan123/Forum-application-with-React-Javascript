import React from 'react';
import { ActionButton } from './buttonComponents/ActionButton';

export function CommentActions({ onEdit, onDelete }) {
  return (
    <div className='comment-actions'>
      <ActionButton
        label='✏️ Edit Comment'
        onClick={onEdit}
        className='edit-comment-button'
      ></ActionButton>
      <ActionButton
        label='🗑️ Delete Comment'
        onClick={onDelete}
        className='delete-comment-button'
      ></ActionButton>
    </div>
  );
}
