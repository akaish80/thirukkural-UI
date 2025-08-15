/* eslint-disable jsx-a11y/aria-role */
import React, { memo } from 'react';
import { useDrag } from 'react-dnd';
import './DragAndDrop.scss';

export const DropContainer = memo(({ name, type, isDropped }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [name, type]);

  // Build CSS class names based on state
  let className = 'drop-container';
  if (isDragging) {
    className += ' dragging';
  }

  return (
    <div ref={drag} role="Box" className={className}>
      {isDropped ? <s>{name}</s> : name}
    </div>
  );
});
