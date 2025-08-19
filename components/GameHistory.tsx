"use client";
export interface HistoryEntry {
  date: string;
  players: [string, string];
  size: number;
  result: string;
}

export default function GameHistory({ history }: { history: HistoryEntry[] }) {
  if (!history.length) return null;

  const latest = history[0];
  const others = history.slice(1);

  return (
    <details className="mt-6 bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <summary className="px-4 py-2 cursor-pointer font-semibold">
        Latest: {latest.players[0]} vs {latest.players[1]} — {latest.result}
      </summary>
      <div className="p-4 bg-gray-700 overflow-x-auto">
        {others.length ? (
          <div className="flex space-x-4">
            {others.map((h, i) => {
              const isDraw = h.result.startsWith('Draw');
              const winnerName = isDraw ? '' : h.result.split(' ')[0];
              return (
                <div key={i} className="min-w-[240px] p-3 bg-gray-600 rounded-lg">
                  <div className="text-xs text-gray-400">{h.date}</div>
                  <div className="font-medium mb-1">
                    {h.players.map((name, idx) => (
                      <span
                        key={idx}
                        className={
                          name === winnerName
                            ? 'text-green-300 font-semibold'
                            : 'text-gray-100'
                        }
                      >
                        {name}{idx === 0 && ' vs '}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-200">{h.size}×{h.size}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-sm text-gray-400">No other history</div>
        )}
      </div>
    </details>
  );
}
