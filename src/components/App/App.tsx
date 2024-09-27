import React from 'react';
import './App.css';
import GameField from "../GameField/GameField";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <GameField field={} onCellClick={}></GameField>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
