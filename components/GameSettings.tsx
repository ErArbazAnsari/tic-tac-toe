"use client";
import { FormEvent, useState } from 'react';

export interface GameSettings {
  playerX: string;
  playerO: string;
  startSymbol: 'X' | 'O';
  size: number;
}
interface Props {
  onStart: (settings: GameSettings) => void;
}

export default function GameSettings({ onStart }: Props) {
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');
  const [startSymbol, setStartSymbol] = useState<'X' | 'O'>('X');
  const [size, setSize] = useState(3);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onStart({ playerX: playerX || 'Player X', playerO: playerO || 'Player O', startSymbol, size });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-gray-800 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-200">Player X Name</label>
        <input
          className="mt-1 w-full p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={playerX}
          onChange={e => setPlayerX(e.target.value)}
          placeholder="Player X"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-200">Player O Name</label>
        <input
          className="mt-1 w-full p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={playerO}
          onChange={e => setPlayerO(e.target.value)}
          placeholder="Player O"
        />
      </div>
      <div>
        <span className="block text-sm font-medium text-gray-200">Start Symbol</span>
        <div className="flex space-x-4 mt-2">
          {['X', 'O'].map(symbol => (
            <label key={symbol} className="inline-flex items-center space-x-1 text-gray-200">
              <input
                type="radio"
                name="startSymbol"
                value={symbol}
                checked={startSymbol === symbol}
                onChange={() => setStartSymbol(symbol as 'X' | 'O')}
                className="accent-blue-500"
              />
              <span>{symbol}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-200">Board Size</label>
        <input
          type="number"
          min={3}
          max={10}
          className="mt-1 w-full p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={size}
          onChange={e => setSize(Math.max(3, Math.min(10, parseInt(e.target.value) || 3)))}
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500 transition"
      >
        Start Game
      </button>
    </form>
  );
}
