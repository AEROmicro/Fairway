import { useState, useEffect } from 'react';
import { getRankings, TOURS } from '../utils/api';
import { PageLoader, ErrorMessage } from '../components/shared/UI';

function RankRow({ player, rank }) {
  const athlete = player.athlete || {};
  const change = player.rankChange || 0;
  const points = player.points || player.value || '—';
  const avg = player.averagePoints || '—';
  const events = player.eventsPlayed || '—';
  const prevRank = rank + change;

  return (
    <div className="leaderboard-row group">
      {/* Rank */}
      <div className="w-10 flex-shrink-0 text-center">
        <span className={`font-bold text-sm ${rank <= 3 ? 'text-fairway-gold' : 'text-gray-300'}`}>
          {rank <= 3 ? ['🥇','🥈','🥉'][rank-1] : rank}
        </span>
      </div>

      {/* Trend */}
      <div className="w-8 flex-shrink-0 text-center hidden sm:block">
        {change > 0 && <span className="text-green-400 text-xs">▲ {change}</span>}
        {change < 0 && <span className="text-red-400 text-xs">▼ {Math.abs(change)}</span>}
        {change === 0 && <span className="text-gray-600 text-xs">—</span>}
      </div>

      {/* Player info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {athlete.headshot?.href ? (
          <img
            src={athlete.headshot.href}
            alt={athlete.displayName}
            className="w-9 h-9 rounded-full object-cover border border-white/10 flex-shrink-0"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-fairway-green/30 flex items-center justify-center flex-shrink-0 text-base">
            🏌️
          </div>
        )}
        <div className="min-w-0">
          <p className="text-white font-semibold text-sm truncate group-hover:text-fairway-lightgreen transition-colors">
            {athlete.displayName || 'Unknown'}
          </p>
          {athlete.country && (
            <p className="text-gray-500 text-xs">{athlete.country}</p>
          )}
        </div>
      </div>

      {/* Points */}
      <div className="text-right flex-shrink-0">
        <p className="text-white font-bold text-sm">
          {typeof points === 'number' ? points.toLocaleString() : points}
        </p>
        <p className="text-gray-500 text-xs">pts</p>
      </div>

      {/* Events played */}
      <div className="w-16 text-right flex-shrink-0 hidden md:block">
        <p className="text-gray-300 text-sm">{events}</p>
        <p className="text-gray-500 text-xs">events</p>
      </div>
    </div>
  );
}

export default function RankingsPage() {
  const [tour, setTour] = useState('pga');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);
    getRankings(tour)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [tour]);

  // Normalise rankings from ESPN's varying shapes
  const rawRanks =
    data?.rankings?.[0]?.ranks ||
    data?.rankings ||
    data?.items ||
    [];

  const filtered = rawRanks.filter((r) => {
    if (!search) return true;
    const name = (r.athlete?.displayName || r.athlete?.fullName || '').toLowerCase();
    const country = (r.athlete?.country || '').toLowerCase();
    return name.includes(search.toLowerCase()) || country.includes(search.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-2">World Rankings</h1>
        <p className="text-gray-400">Official tour rankings and player standings</p>
      </div>

      {/* Tour tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {Object.values(TOURS).map((t) => (
          <button
            key={t.id}
            onClick={() => setTour(t.id)}
            className={`tab-btn ${tour === t.id ? 'tab-active' : 'tab-inactive'}`}
          >
            {t.shortName}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search player or country…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {loading ? (
        <PageLoader />
      ) : error ? (
        <ErrorMessage message={`Rankings unavailable: ${error}`} />
      ) : filtered.length === 0 ? (
        <div className="card p-10 text-center text-gray-400">
          {search ? `No players found matching "${search}"` : 'Rankings data not available for this tour right now.'}
        </div>
      ) : (
        <div className="card overflow-hidden">
          {/* Table header */}
          <div className="flex items-center gap-4 px-4 py-2 bg-white/5 border-b border-white/10 text-xs text-gray-500 font-semibold uppercase tracking-wider">
            <div className="w-10 text-center">Rank</div>
            <div className="w-8 hidden sm:block text-center">±</div>
            <div className="flex-1">Player</div>
            <div className="text-right">Points</div>
            <div className="w-16 text-right hidden md:block">Events</div>
          </div>
          <div className="divide-y divide-white/5">
            {filtered.map((player, i) => (
              <RankRow
                key={player.athlete?.id || i}
                player={player}
                rank={player.currentRank || i + 1}
              />
            ))}
          </div>
        </div>
      )}

      {/* Info note */}
      <p className="text-gray-600 text-xs mt-4 text-center">
        Rankings data provided by ESPN Golf API · Updated weekly
      </p>
    </div>
  );
}
