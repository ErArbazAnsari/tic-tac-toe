"use client";
import { useState, useEffect } from 'react';
import TicTacToe from '../components/TicTacToe';
import GameSettings, { GameSettings as Settings } from '../components/GameSettings';
import GameHistory, { HistoryEntry } from '../components/GameHistory';

export default function Home() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // load past history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('tic-tac-toe-history');
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  function handleStart(opts: Settings) {
    setSettings(opts);
  }

  function handleGameEnd(result: string, size: number, players: [string, string]) {
    const entry: HistoryEntry = {
      date: new Date().toLocaleString(),
      players,
      size,
      result,
    };
    const updated = [entry, ...history];
    setHistory(updated);
    localStorage.setItem('tic-tac-toe-history', JSON.stringify(updated));
  }

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-gray-100 flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold">Tic Tac Toe</h1>
      <div className="w-full max-w-md space-y-6">
        {!settings && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <GameSettings onStart={handleStart} />
          </div>
        )}
        {settings && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
            <TicTacToe
              {...settings}
              onGameEnd={handleGameEnd}
              playerX={settings.playerX}
              playerO={settings.playerO}
            />
            <button
              className="w-full py-2 bg-yellow-500 text-gray-900 rounded-lg font-medium hover:bg-yellow-600 transition"
              onClick={() => setSettings(null)}
            >
              Change Settings
            </button>
          </div>
        )}
        <GameHistory history={history} />
      </div>
    </div>
  );
}
