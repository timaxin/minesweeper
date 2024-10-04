import React, { useState, useCallback, useEffect } from 'react';
import './App.scss';
import GameField from '../GameField/GameField';
import { makeField, openNearbyEmptyCell, FieldSizeInit, findCell } from '../../utils';
import { Cell, Field, GameStatuses } from '../../types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function App() {
  const [fieldSize] = useState(FieldSizeInit);
  const [field, setField] = useState<Field>(() => makeField(fieldSize.width, fieldSize.height));
  const [gameState, setGameState] = useState<GameStatuses>(GameStatuses.RUNNING);
  const resetGame = useCallback(() => setField(makeField(fieldSize.width, fieldSize.height)), [setField, fieldSize]);

  const startNewGame = useCallback(() => {
    resetGame();
    setGameState(GameStatuses.RUNNING);
  }, [resetGame])

  useEffect(() => {
    if (gameState === GameStatuses.RUNNING) return;

    setTimeout(() => {
      alert(gameState === GameStatuses.GAME_OVER ? 'Game Over!' : 'You win!');
      startNewGame();
    }, 50);
  }, [gameState, startNewGame]);

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
      <Header
        onStartNewGame={startNewGame}
      />
      <main>
        <aside>
          <div className="legend">
            <div className="legend__title">Legend</div>
            <div className="legend__subtitle">Mouse clicks</div>
            <div>Left button - open cell</div>
            <div>Right button - add/remove flag</div>
          </div>
        </aside>
        <GameField field={field} onCellClick={handleCellClick}></GameField>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
