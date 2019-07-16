import Board from './Board';
import React from 'react';
import './TicTacToe.css';

export interface ITicTacToeProps {
  players: string[];
  size: number;
  symbols: string[];
}

export interface ITicTacToeState {
  board: string[][];
  currentPlayer: number;
  moves: number;
  winner: undefined|number;
}

export default class TicTacToe extends React.Component<ITicTacToeProps, ITicTacToeState> {
  constructor(props: ITicTacToeProps) {
    super(props);

    // Bind methods
    this.play = this.play.bind(this);
    this.switchPlayers = this.switchPlayers.bind(this);
    this.checkForWinners = this.checkForWinners.bind(this);

    // Set state
    this.state = {
      board: [],
      currentPlayer: 0,
      winner: undefined,
      moves: this.props.size * this.props.size,
    };

    // Fill empty board
    for (let i = 0; i < this.props.size; i++) {
      this.state.board.push(new Array<string>(this.props.size).fill(''));
    }
  }

  render(): JSX.Element {
    return (
      <div className="tic-tac-toe">
        {/* We have a winner */}
        {this.state.winner !== undefined && <h1 className="winner">
          🎉 {this.props.players[this.state.winner]} is the winner!
        </h1>}

        {/* The board */}
        {this.state.winner === undefined && <div className="game">
          <Board grid={this.state.board} onPlay={this.play} />
          <footer className="status">
            Waiting for <strong>{this.props.players[this.state.currentPlayer]}</strong> to place an <strong>{this.props.symbols[this.state.currentPlayer]}</strong> ({this.state.moves} moves left)
          </footer>
        </div>}
      </div>
    );
  }

  play(x: number, y: number): void {
    // Already played
    if (this.state.board[y][x] !== '') return;

    // Mark the board
    const newBoard = [...this.state.board];
    newBoard[y][x] = this.props.symbols[this.state.currentPlayer];
    this.setState({
      board: newBoard,
      moves: this.state.moves - 1,
    });

    // Check for winners
    this.checkForWinners();

    // Switch players
    this.switchPlayers();
  }

  switchPlayers(): void {
    this.setState({ currentPlayer: this.state.currentPlayer === 0 ? 1 : 0 });
  }

  checkForWinners(): void {
    // Check for winning rows and columns
    for (let i = 0; i < this.props.size; i++) {
      if (this.isWinningRow(i) || this.isWinningCol(i)) {
        this.setState({ winner: this.state.currentPlayer });
        return;
      }
    }

    // Check for winning diagonals
    if (this.isWinningDiagonalLeft() || this.isWinningDiagonalRight()) {
      this.setState({ winner: this.state.currentPlayer });
      return;
    }
  }

  isWinningRow(y: number): boolean {
    const rowSymbol: string = this.state.board[y][0];
    if (rowSymbol === '') return false; // Not marked
    const matchRight = (x: number): boolean => {
      if (x >= this.props.size) return true;
      if (this.state.board[y][x] !== rowSymbol) return false;
      else return matchRight(x + 1);
    }
    return matchRight(1);
  }

  isWinningCol(x: number): boolean {
    const colSymbol: string = this.state.board[0][x];
    if (colSymbol === '') return false; // Not marked
    const matchDown = (y: number): boolean => {
      if (y >= this.props.size) return true;
      if (this.state.board[y][x] !== colSymbol) return false;
      else return matchDown(y + 1);
    }
    return matchDown(1);
  }

  isWinningDiagonalLeft(): boolean {
    const diagSymbol: string = this.state.board[0][0];
    if (diagSymbol === '') return false; // Not marked
    const matchDownRight = (x: number, y: number): boolean => {
      if (x >= this.props.size || y >= this.props.size) return true;
      if (this.state.board[y][x] !== diagSymbol) return false;
      else return matchDownRight(x + 1, y + 1);
    }
    return matchDownRight(1, 1);
  }

  isWinningDiagonalRight(): boolean {
    const diagSymbol: string = this.state.board[0][this.props.size - 1];
    if (diagSymbol === '') return false; // Not marked
    const matchDownLeft = (x: number, y: number): boolean => {
      if (x < 0 || y >= this.props.size) return true;
      if (this.state.board[y][x] !== diagSymbol) return false;
      else return matchDownLeft(x - 1, y + 1);
    }
    return matchDownLeft(this.props.size - 2, 1);
  }
}
