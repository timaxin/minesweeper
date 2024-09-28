import React from 'react';
import { Cell } from '../../types';
import './FieldCell.css';

const FieldCell: React.FC<{
  cell: Cell,
  onClick: React.MouseEventHandler,
}> = ({cell, onClick}) => {

  const handleContextMenuClick: React.MouseEventHandler = event => {
    event.preventDefault();
    onClick(event);
  };

  const classes = [
    'cell',
    cell.open && '_open',
    (!cell.withBomb && (cell.bombsNearby > 0)) && '_bombs-nearby',
    cell.withBomb && '_bomb',
    !cell.open && cell.flag && '_flag',
  ].filter(Boolean).join(' ');
  return (
    <div
      className={classes}
      data-x={cell.x}
      data-y={cell.y}
      data-bombs-nearby={cell.bombsNearby}
      onClick={onClick}
      onContextMenu={handleContextMenuClick}
    >{cell.bombsNearby > 0 && cell.open && !cell.withBomb ? cell.bombsNearby : ''}</div>
  );
};

export default FieldCell;
