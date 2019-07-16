import React from 'react';
import './Board.css';

export interface IBoardProps {
  grid: string[][];
  onPlay: (x: number, y: number) => void;
}

export default class Board extends React.Component<IBoardProps> {
  render(): JSX.Element {
    return (
      <div className="board" style={{ gridTemplateColumns: `repeat(${this.props.grid.length}, 1fr)` }}>
        {this.props.grid.map((row, y) => row.map((symbol, x) => (
          <button className="cell" key={`${y}-${x}`} onClick={e => this.props.onPlay(x, y)}>
            {symbol}
          </button>
        )))}
      </div>
    );
  }
}
