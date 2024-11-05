import React, { useState, useCallback, useEffect, useRef } from 'react';
import './App.scss';
import GameField from '../GameField/GameField';
import { makeField, openNearbyEmptyCell, findCell } from '../../utils';
import { Cell, Field, GameStatus } from '../../types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Settings from '../Settings/Settings';
import { useSettings } from '../SettingsProvider/SettingsProvider';

function App() {
  const appStarted: React.MutableRefObject<boolean> = useRef(false);
  const { fieldSize, bombsCount } = useSettings();
  const [field, setField] = useState<Field>(() => makeField(fieldSize.width, fieldSize.height, bombsCount));
  const [gameState, setGameState] = useState<GameStatus>(GameStatus.RUNNING);

  const startNewGame = useCallback(() => {
    setField(makeField(fieldSize.width, fieldSize.height, bombsCount));
    setGameState(GameStatus.RUNNING);
  }, [fieldSize.width, fieldSize.height, bombsCount]);

  useEffect(() => {
    if (appStarted.current) {
      startNewGame();
    } else {
      appStarted.current = true;
    }
  }, [startNewGame]);

  useEffect(() => {
    if (gameState === GameStatus.RUNNING) return;

    setTimeout(() => {
      alert(gameState === GameStatus.GAME_OVER ? 'Game Over!' : 'You win!');
      startNewGame();
    }, 50);
  }, [gameState, startNewGame]);

  const checkForVictory = (newField: Field): void => {
    const isVictory = newField.every(row => row.every(col => (col.open || col.flag)));
    if (isVictory) {
      setGameState(GameStatus.VICTORY);
    }
  };

  const handleCellClick = (cell: Cell, type: 'select' | 'flag'): void => {
    if (cell.open || gameState === GameStatus.GAME_OVER || gameState === GameStatus.VICTORY) return;

    const newField = [...field].map(
      row => [...row].map(_cell => ({ ..._cell }))
    );
    const targetCell = findCell(cell.x, cell.y, newField);
    if (!targetCell) return;

    if (type === 'flag') {
      targetCell.flag = !targetCell.flag;
      setField(newField);
      checkForVictory(newField);
      return;
    }

    if (targetCell.flag) {
      targetCell.flag = false;
      setField(newField);
      return;
    }

    targetCell.open = true;

    if (targetCell.bombsNearby === 0 && !targetCell.withBomb) {
      openNearbyEmptyCell(targetCell, newField);
    }
    setField(newField);

    if (targetCell.withBomb) {
      setGameState(GameStatus.GAME_OVER);
      return;
    }

    checkForVictory(newField);
  };

  return (
    <div className="App">
      <Header
        startNewGame={startNewGame}
      />
      <main>
        <Settings/>
        <GameField field={field} onCellClick={handleCellClick}/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
