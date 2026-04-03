import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getScoreboard, TOURS } from '../utils/api';
import { PageLoader, ErrorMessage, EmptyState } from '../components/shared/UI';

const STATUS_LABELS = {
  'in progress': { label: 'Live', cls: 'badge-live', dot: true },
  'final': { label: 'Final', cls: 'badge-completed', dot: false },
  'scheduled': { label: 'Upcoming', cls: 'badge-upcoming', dot: false },
  'postponed': { label: 'Postponed', cls: 'badge-completed', dot: false },
  'cancelled': { label: 'Cancelled', cls: 'badge-completed', dot: false },
};

function getStatusInfo(statusStr) {
  const s = (statusStr || '').toLowerCase();
  for (const key of Object.keys(STATUS_LABELS)) {
    if (s.includes(key)) return STATUS_LABELS[key];
  }
  return { label: statusStr || 'Unknown', cls: 'badge-completed', dot: false };
}

function TournamentRow({ event, tour }) {
  const comp = event.competitions?.[0];
  const status = comp?.status?.type?.description || '';
  const si = getStatusInfo(status);
  const venue = comp?.venue?.fullName || '—';
  const city = comp?.venue?.address?.city || '';
  const country = comp?.venue?.address?.country || '';
  const location = [city, country].filter(Boolean).join(', ') || '—';
  const purse = event.competitions?.[0]?.attendance || null;

  const startDate = event.date ? new Date(event.date) : null;
  const formattedDate = startDate
    ? startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '—';

  const leader = comp?.competitors?.[0];
  const leaderName = leader?.athlete?.shortName || leader?.athlete?.displayName || '—';
  const leaderScore = leader?.score || 'E';

  return (
    <Link
      to={`/leaderboard?tour=${tour}&event=${event.id}`}
      className="leaderboard-row group hover:bg-white/5 transition-all"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white font-semibold text-sm truncate group-hover:text-fairway-lightgreen transition-colors">
            {event.name}
          </span>
          <span className={si.cls + ' flex items-center gap-1'}>
            {si.dot && <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />}
            {si.label}
          </span>
        </div>
        <div className="flex items-center gap-4 mt-1 flex-wrap">
          <span className="text-gray-500 text-xs flex items-center gap-1">
            <span>🏟️</span> {venue}
          </span>
          {location !== '—' && (
            <span className="text-gray-500 text-xs flex items-center gap-1">
              <span>📍</span> {location}
            </span>
          )}
          <span className="text-gray-500 text-xs flex items-center gap-1">
            <span>📅</span> {formattedDate}
          </span>
        </div>
      </div>
      <div className="flex-shrink-0 text-right hidden sm:block">
        {leader && (
          <>
            <p className="text-xs text-gray-500 mb-0.5">Leader</p>
            <p className="text-white text-sm font-medium">{leaderName}</p>
            <p className={`text-sm font-bold ${
              leaderScore.startsWith('-') ? 'text-red-400' :
              leaderScore.startsWith('+') ? 'text-blue-400' :
              'text-gray-300'
            }`}>{leaderScore}</p>
          </>
        )}
        {!leader && (
          <span className="text-gray-600 text-xs">No scores yet</span>
        )}
      </div>
      <svg className="w-4 h-4 text-gray-600 group-hover:text-fairway-lightgreen transition-colors flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

function TourSelector({ selected, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {Object.values(TOURS).map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`tab-btn ${selected === t.id ? 'tab-active' : 'tab-inactive'}`}
        >
          {t.shortName}
        </button>
      ))}
    </div>
  );
}

function YearSelector({ selected, onChange }) {
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2];
  return (
    <div className="flex gap-2">
      {years.map((y) => (
        <button
          key={y}
          onClick={() => onChange(y)}
          className={`tab-btn text-sm ${selected === y ? 'tab-active' : 'tab-inactive'}`}
        >
          {y}
        </button>
      ))}
    </div>
  );
}

export default function TournamentsPage() {
  const [tour, setTour] = useState('pga');
  const [filter, setFilter] = useState('all');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);
    getScoreboard(tour)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [tour]);

  const allEvents = data?.events || [];

  const filtered = allEvents.filter((ev) => {
    const status = (ev.competitions?.[0]?.status?.type?.description || '').toLowerCase();
    if (filter === 'live') return status.includes('in progress') || status.includes('live');
    if (filter === 'upcoming') return status.includes('scheduled') || status.includes('pre-event');
    if (filter === 'completed') return status.includes('final') || status.includes('completed');
    return true;
  });

  const liveCount = allEvents.filter((ev) => {
    const s = (ev.competitions?.[0]?.status?.type?.description || '').toLowerCase();
    return s.includes('in progress');
  }).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="font-display text-3xl font-bold text-white">Tournaments &amp; Competitions</h1>
          {liveCount > 0 && (
            <span className="badge-live">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
              {liveCount} Live
            </span>
          )}
        </div>
        <p className="text-gray-400">Track every PGA, LPGA, Champions, and DP World Tour event</p>
      </div>

      {/* Tour tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <TourSelector selected={tour} onChange={setTour} />
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: 'all', label: 'All Events' },
          { key: 'live', label: '🔴 Live' },
          { key: 'upcoming', label: '📅 Upcoming' },
          { key: 'completed', label: '✅ Completed' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filter === key
                ? 'bg-fairway-green text-white'
                : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/15'
            }`}
          >
            {label}
            {key === 'all' && allEvents.length > 0 && (
              <span className="ml-1.5 text-xs opacity-60">({allEvents.length})</span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <PageLoader />
      ) : error ? (
        <ErrorMessage message={error} onRetry={() => { setLoading(true); getScoreboard(tour).then(setData).catch((e) => setError(e.message)).finally(() => setLoading(false)); }} />
      ) : filtered.length === 0 ? (
        <EmptyState icon="🏌️" title="No tournaments found" subtitle="Try a different tour or filter." />
      ) : (
        <div className="card overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <span className="text-gray-400 text-sm">{filtered.length} event{filtered.length !== 1 ? 's' : ''}</span>
            <span className="text-gray-500 text-xs">{TOURS[tour]?.name}</span>
          </div>
          <div className="divide-y divide-white/5">
            {filtered.map((ev) => (
              <TournamentRow key={ev.id} event={ev} tour={tour} />
            ))}
          </div>
        </div>
      )}

      {/* Stats Summary */}
      {!loading && !error && allEvents.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          {[
            { label: 'Total Events', value: allEvents.length, icon: '📋' },
            { label: 'Live Now', value: liveCount, icon: '🔴' },
            {
              label: 'Upcoming',
              value: allEvents.filter((ev) => {
                const s = (ev.competitions?.[0]?.status?.type?.description || '').toLowerCase();
                return s.includes('scheduled') || s.includes('pre');
              }).length,
              icon: '📅',
            },
            {
              label: 'Completed',
              value: allEvents.filter((ev) => {
                const s = (ev.competitions?.[0]?.status?.type?.description || '').toLowerCase();
                return s.includes('final');
              }).length,
              icon: '✅',
            },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-white font-bold text-2xl">{s.value}</span>
              <span className="text-gray-400 text-xs">{s.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
