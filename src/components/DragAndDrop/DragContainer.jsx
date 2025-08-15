/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import { useDrop } from 'react-dnd';
import './DragAndDrop.scss';

export const DragContainer = ({ name, accept, onDrop }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  // Build CSS class names based on state
  let className = 'drag-container';
  if (isActive) {
    className += ' is-active';
  } else if (canDrop) {
    className += ' can-drop';
  }

  return (
    <div ref={drop} role="DragContainer" className={className}>
      {isActive ? 'Release to drop' : name}
    </div>
  );
};