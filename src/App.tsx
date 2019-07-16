import React from 'react';
import TicTacToe from './TicTacToe';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <TicTacToe players={['Seth', 'Kyle']} symbols={['X', 'O']} size={3} />
      <TicTacToe players={['Seth', 'Kyle']} symbols={['X', 'O']} size={5} />
    </div>
  );
}

export default App;
