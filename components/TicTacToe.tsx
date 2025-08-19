"use client";
import { useState, useEffect } from 'react';

export type SquareValue = 'X' | 'O' | null;
export interface TicTacToeProps {
  playerX: string;
  playerO: string;
  startSymbol: 'X' | 'O';
  size: number;
  onGameEnd: (result: string, size: number, players: [string, string]) => void;
}

interface WinnerInfo {
  winner: SquareValue;
  line: number[];
}

function calculateWinner(squares: SquareValue[], size: number): WinnerInfo | null {
  const lines: number[][] = [];
  // rows
  for (let r = 0; r < size; r++) {
    const row: number[] = [];
    for (let c = 0; c < size; c++) row.push(r * size + c);
    lines.push(row);
  }
  // cols
  for (let c = 0; c < size; c++) {
    const col: number[] = [];
    for (let r = 0; r < size; r++) col.push(r * size + c);
    lines.push(col);
  }
  // diags
  const diag1: number[] = [];
  const diag2: number[] = [];
  for (let i = 0; i < size; i++) {
    diag1.push(i * size + i);
    diag2.push(i * size + (size - 1 - i));
  }
  lines.push(diag1, diag2);

  for (const line of lines) {
    const [first, ...rest] = line;
    if (squares[first] && rest.every(i => squares[i] === squares[first])) {
      return { winner: squares[first], line };
    }
  }
  return null;
}

export default function TicTacToe({ playerX, playerO, startSymbol, size, onGameEnd }: TicTacToeProps) {
  const [squares, setSquares] = useState<SquareValue[]>(Array(size * size).fill(null));
  const [xIsNext, setXIsNext] = useState(startSymbol === 'X');
  const [winnerInfo, setWinnerInfo] = useState<WinnerInfo | null>(null);
  const isDraw = !winnerInfo && squares.every(Boolean);

  useEffect(() => {
    const info = calculateWinner(squares, size);
    setWinnerInfo(info);
    if (info) {
      const name = info.winner === 'X' ? playerX : playerO;
      const result = `${name} 🎉`;
      onGameEnd(result, size, [playerX, playerO]);
    } else if (isDraw) {
      const result = 'Draw 🤝';
      onGameEnd(result, size, [playerX, playerO]);
    }
  }, [squares]);

  function handleClick(i: number) {
    if (winnerInfo || squares[i]) return;
    const next = squares.slice();
    next[i] = xIsNext ? 'X' : 'O';
    setSquares(next);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(size * size).fill(null));
    setXIsNext(startSymbol === 'X');
    setWinnerInfo(null);
  }

  const status = winnerInfo
    ? `${winnerInfo.winner === 'X' ? playerX : playerO} 🎉`
    : isDraw
    ? 'Draw 🤝'
    : `Next: ${xIsNext ? playerX : playerO}`;

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-md flex flex-col items-center space-y-6">
      <div
        className={
          `px-4 py-2 rounded text-xl font-semibold transition ` +
          (winnerInfo
            ? 'bg-green-600 text-gray-100'
            : 'bg-gray-800 text-gray-100')
        }
      >
        {status}
      </div>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      >
        {squares.map((v, idx) => {
          const isHighlight = winnerInfo?.line.includes(idx);
          return (
            <button
              key={idx}
              className={`w-16 h-16 text-2xl font-bold rounded-lg focus:outline-none transition transform ${isHighlight ? 'bg-green-400' : 'bg-gray-600 hover:bg-gray-500'}`}
              onClick={() => handleClick(idx)}
            >{v}</button>
          );
        })}
      </div>
      <button
        className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500 transition"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
}
