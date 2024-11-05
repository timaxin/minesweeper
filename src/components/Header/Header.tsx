import React from 'react';
import './Header.scss';

const Header: React.FC <{
  startNewGame: () => void,
}> = ({ startNewGame }) => {
  return (
    <header className="header">
      <h1 className="center">Minesweeper game</h1>
      <div className="center new-game">
        <button className="button button_new-game" onClick={startNewGame}>New game</button>
      </div>
    </header>
  );
};

export default Header;
