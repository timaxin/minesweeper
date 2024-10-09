import React from 'react';
import { Cell, Field } from '../../types';
import './GameField.scss';
import FieldCell from '../FieldCell/FieldCell';
import { useSettings } from '../SettingsProvider/SettingsProvider';

const LEFT_BUTTON_CODE = 0;
const RIGHT_BUTTON_CODE = 2;

const GameField: React.FC<{
  field: Field,
  onCellClick: (cell: Cell, type: 'select' | 'flag') => void,
}> = ({ field, onCellClick }) => {
  const { invertControls } = useSettings();
  const handleClick = (ev: React.MouseEvent, cell: Cell) => {
    if (![LEFT_BUTTON_CODE, RIGHT_BUTTON_CODE].includes(ev.button)) return;
    const selectButtonCode = invertControls ? RIGHT_BUTTON_CODE : LEFT_BUTTON_CODE;
    onCellClick(cell, ev.button === selectButtonCode ? 'select' : 'flag');
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
