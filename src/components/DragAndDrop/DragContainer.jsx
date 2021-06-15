/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import { useDrop } from 'react-dnd';

const style = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
};

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
  let backgroundColor = '#222';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }
  return (
    <div ref={drop} role="DragContainer" style={{ ...style, backgroundColor }}>
      {isActive ? 'Release to drop' : name}
    </div>
  );
};
