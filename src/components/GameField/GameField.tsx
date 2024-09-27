import React from 'react';
import { Cell, Field } from '../../types';
import './GameField.css';

const GameField: React.FC<{
  field: Field,
  onCellClick: (cell: Cell, type: 'select' | 'flag') => void,
}> = ({field, onCellClick}) => {
  return (
    <></>
  );
}

export default GameField;
