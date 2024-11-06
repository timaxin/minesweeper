import React from 'react';
import './Header.scss';
import { useSettingsDispatch } from '../SettingsProvider/SettingsProvider';

const Header: React.FC <{
  startNewGame: () => void,
}> = ({ startNewGame }) => {
  const dispatch = useSettingsDispatch();
  const openSettings = () => {
    dispatch({
      type: 'setOpened',
      value: true,
    });
  };
  return (
    <header className="header">
      <div tabIndex={0} className="burger toggle-button header-open-settings" onClick={openSettings}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h1 className="center">Minesweeper game</h1>
      <div className="center new-game">
        <button className="button button_new-game" onClick={startNewGame}>New game</button>
      </div>
    </header>
  );
};

export default Header;
