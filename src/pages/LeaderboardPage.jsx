import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getScoreboard, TOURS, scoreClass } from '../utils/api';
import { PageLoader, ErrorMessage, EmptyState } from '../components/shared/UI';

function ScoreCell({ val }) {
  return <span className={scoreClass(val)}>{val || '—'}</span>;
}

function PlayerRow({ competitor, index }) {
  const athlete = competitor.athlete || {};
  const position = competitor.status?.position?.displayName || competitor.order || index + 1;
  const score = competitor.score || 'E';
  const thru = competitor.status?.thru || competitor.status?.period || '';
  const today = competitor.statistics?.find((s) => s.name === 'roundScore')?.displayValue || '—';
  const r1 = competitor.statistics?.find((s) => s.name === 'round1Score')?.displayValue || '—';
  const r2 = competitor.statistics?.find((s) => s.name === 'round2Score')?.displayValue || '—';
  const r3 = competitor.statistics?.find((s) => s.name === 'round3Score')?.displayValue || '—';
  const r4 = competitor.statistics?.find((s) => s.name === 'round4Score')?.displayValue || '—';

  const isCut = competitor.status?.type?.name === 'STATUS_CUT';
  const isWinner = competitor.winner || position === 1 || position === '1';

  return (
    <div className={`leaderboard-row ${isCut ? 'opacity-40' : ''}`}>
      {/* Position */}
      <div className="w-10 flex-shrink-0 text-center">
        {isWinner ? (
          <span className="text-fairway-gold text-lg">🏆</span>
        ) : (
          <span className={`text-sm font-bold ${index < 3 ? 'text-fairway-gold' : 'text-gray-400'}`}>
            {position}
          </span>
        )}
      </div>

      {/* Player */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {athlete.flag?.href ? (
          <img src={athlete.flag.href} alt="" className="w-5 h-3.5 rounded object-cover flex-shrink-0" />
        ) : (
          <span className="text-base flex-shrink-0">🏌️</span>
        )}
        <div className="min-w-0">
          <p className="text-white font-semibold text-sm truncate">
            {athlete.displayName || 'Unknown Player'}
          </p>
          {athlete.country && (
            <p className="text-gray-500 text-xs">{athlete.country}</p>
          )}
        </div>
      </div>

      {/* Score */}
      <div className="w-14 text-center flex-shrink-0">
        <ScoreCell val={score} />
      </div>

      {/* Thru */}
      <div className="w-10 text-center flex-shrink-0 hidden sm:block">
        <span className="text-gray-400 text-xs">{thru || '—'}</span>
      </div>

      {/* Round scores */}
      <div className="hidden md:flex gap-3 flex-shrink-0 text-xs text-gray-400">
        <span className="w-7 text-center">{r1}</span>
        <span className="w-7 text-center">{r2}</span>
        <span className="w-7 text-center">{r3}</span>
        <span className="w-7 text-center">{r4}</span>
      </div>

      {/* Today */}
      <div className="w-14 text-right flex-shrink-0 hidden lg:block">
        <span className="text-gray-400 text-xs">{today}</span>
      </div>
    </div>
  );
}

function EventHeader({ event }) {
  const comp = event.competitions?.[0];
  const status = comp?.status?.type?.description || '';
  const venue = comp?.venue?.fullName || '—';
  const isLive = status.toLowerCase().includes('in progress');
  const date = event.date ? new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—';

  return (
    <div
      className="relative rounded-2xl overflow-hidden mb-6"
      style={{
        backgroundImage: `linear-gradient(135deg, #0f2044 0%, #1a7a4a33 100%)`,
      }}
    >
      <div className="p-6 border border-white/10 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {isLive && (
                <span className="badge-live flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                  Live
                </span>
              )}
              {!isLive && status && (
                <span className="badge-completed">{status}</span>
              )}
            </div>
            <h2 className="font-display text-2xl font-bold text-white">{event.name}</h2>
            <p className="text-gray-400 mt-1 flex items-center gap-1.5">
              <span>🏟️</span> {venue}
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-1">
              <span>📅</span> {date}
            </p>
          </div>
          <div className="sm:text-right">
            {comp?.competitors?.[0] && (
              <div>
                <p className="text-gray-400 text-xs mb-1">Current Leader</p>
                <p className="text-white font-bold">
                  {comp.competitors[0].athlete?.displayName || '—'}
                </p>
                <p className={`text-2xl font-bold ${scoreClass(comp.competitors[0].score || 'E')}`}>
                  {comp.competitors[0].score || 'E'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  const [searchParams] = useSearchParams();
  const tourParam = searchParams.get('tour') || 'pga';
  const [tour, setTour] = useState(tourParam);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getScoreboard(tour)
      .then((d) => { setData(d); setSelectedEvent(0); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [tour]);

  const events = data?.events || [];
  const activeEvent = events[selectedEvent];
  const competitors = activeEvent?.competitions?.[0]?.competitors || [];

  // Sort by position (try to use status.position.id or order)
  const sorted = [...competitors].sort((a, b) => {
    const pa = parseInt(a.status?.position?.id ?? a.order ?? 999, 10);
    const pb = parseInt(b.status?.position?.id ?? b.order ?? 999, 10);
    return pa - pb;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-2">Live Leaderboard</h1>
        <p className="text-gray-400">Real-time scores and standings for active tournaments</p>
      </div>

      {/* Tour selector */}
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

      {loading ? (
        <PageLoader />
      ) : error ? (
        <ErrorMessage message={error} onRetry={() => setTour(t => t)} />
      ) : events.length === 0 ? (
        <EmptyState icon="⛳" title="No active events" subtitle="Check back during tournament weeks." />
      ) : (
        <>
          {/* Event selector */}
          {events.length > 1 && (
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
              {events.map((ev, i) => (
                <button
                  key={ev.id}
                  onClick={() => setSelectedEvent(i)}
                  className={`tab-btn whitespace-nowrap text-sm ${
                    selectedEvent === i ? 'tab-active' : 'tab-inactive'
                  }`}
                >
                  {ev.shortName || ev.name}
                </button>
              ))}
            </div>
          )}

          {activeEvent && <EventHeader event={activeEvent} />}

          {/* Table header */}
          <div className="card overflow-hidden">
            <div className="flex items-center gap-4 px-4 py-2 bg-white/5 border-b border-white/10 text-xs text-gray-500 font-semibold uppercase tracking-wider">
              <div className="w-10 text-center">Pos</div>
              <div className="flex-1">Player</div>
              <div className="w-14 text-center">Score</div>
              <div className="w-10 text-center hidden sm:block">Thru</div>
              <div className="hidden md:flex gap-3 text-xs">
                <span className="w-7 text-center">R1</span>
                <span className="w-7 text-center">R2</span>
                <span className="w-7 text-center">R3</span>
                <span className="w-7 text-center">R4</span>
              </div>
              <div className="w-14 text-right hidden lg:block">Today</div>
            </div>
            <div className="divide-y divide-white/5">
              {sorted.length > 0 ? (
                sorted.map((comp, i) => (
                  <PlayerRow key={comp.id || i} competitor={comp} index={i} />
                ))
              ) : (
                <div className="p-10 text-center text-gray-500">
                  Leaderboard not yet available for this event.
                </div>
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-6 mt-4 flex-wrap text-xs text-gray-500">
            <span><span className="score-under">-5</span> = Under par</span>
            <span><span className="score-even">E</span> = Even par</span>
            <span><span className="score-over">+3</span> = Over par</span>
            <span>🏆 = Winner</span>
          </div>
        </>
      )}
    </div>
  );
}
