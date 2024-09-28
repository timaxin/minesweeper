import React from 'react';
import { Cell, Field } from '../../types';
import './GameField.css';
import FieldCell from '../FieldCell/FieldCell';

const GameField: React.FC<{
  field: Field,
  onCellClick: (cell: Cell, type: 'select' | 'flag') => void,
}> = ({field, onCellClick}) => {
  const handleClick = (ev: React.MouseEvent, cell: Cell) => {
    if (![0, 2].includes(ev.button)) return;
    onCellClick(cell, ev.button === 0 ? 'select' : 'flag');
  };

  const fieldElements = field.map((row, rowI) => {
    const cells = row.map(cell => (
      <FieldCell
        key={`${cell.x}-${cell.y}`}
        cell={cell}
        onClick={ev => handleClick(ev, cell)}
      />
    ));

    return (<div className="row" key={rowI}>{cells}</div>);
  });

  return (
    <div className="fieldContainer">
      <div className="field">
        {fieldElements}
      </div>
    </div>
  );
}

export default GameField;
