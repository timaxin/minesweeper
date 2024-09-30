import React, { useState, useCallback, useEffect } from 'react';
import './App.scss';
import GameField from '../GameField/GameField';
import { makeField, openNearbyEmptyCell, FieldSizeInit, findCell } from '../../utils';
import { Cell, Field, GameStatuses } from '../../types';

function App() {
  const [fieldSize] = useState(FieldSizeInit);
  const [field, setField] = useState<Field>(() => makeField(fieldSize.width, fieldSize.height));
  const [gameState, setGameState] = useState<GameStatuses>(GameStatuses.RUNNING);
  const resetGame = useCallback(() => setField(makeField(fieldSize.width, fieldSize.height)), [setField, fieldSize]);

  useEffect(() => {
    if (gameState === GameStatuses.RUNNING) return;

    setTimeout(() => {
      alert(gameState === GameStatuses.GAME_OVER ? 'Game Over!' : 'You win!');
      resetGame();
      setGameState(GameStatuses.RUNNING);
    }, 50);
  }, [gameState, resetGame]);

  const handleCellClick = (cell: Cell, type: 'select' | 'flag') => {
    if (cell.open || gameState === GameStatuses.GAME_OVER || gameState === GameStatuses.VICTORY) return;

    const newField = [...field].map(
      row => [...row].map(_cell => ({ ..._cell }))
    );
    const targetCell = findCell(cell.x, cell.y, newField);
    if (!targetCell) return;

    if (type === 'flag') {
      targetCell.flag = !targetCell.flag;
      setField(newField);
      return;
    }

    if (targetCell.flag) {
      targetCell.flag = false;
      setField(newField);
      return;
    }

    targetCell.open = true;

    if (targetCell.bombsNearby === 0 && !targetCell.withBomb) openNearbyEmptyCell(targetCell, newField);
    setField(newField);

    if (targetCell.withBomb) {
      setGameState(GameStatuses.GAME_OVER);
      return;
    }

    const isVictory = newField.every(row => row.every(col => (col.open || col.flag)));
    if (isVictory) setGameState(GameStatuses.VICTORY);
  };


  return (
    <div className="App">
      <header></header>
      <main>
        <GameField field={field} onCellClick={handleCellClick}></GameField>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
