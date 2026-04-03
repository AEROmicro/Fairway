import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getScoreboard, getNews, scoreClass } from '../utils/api';
import { PageLoader, ErrorMessage, SkeletonCard } from '../components/shared/UI';

function ScoreDisplay({ score }) {
  return <span className={scoreClass(score)}>{score}</span>;
}

function LiveBadge({ status }) {
  if (!status) return null;
  const s = status.toLowerCase();
  if (s.includes('in progress') || s.includes('live')) {
    return (
      <span className="badge-live">
        <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
        Live
      </span>
    );
  }
  if (s.includes('final') || s.includes('completed')) return <span className="badge-completed">Final</span>;
  return <span className="badge-upcoming">Upcoming</span>;
}

function TournamentCard({ event }) {
  const comp = event.competitions?.[0];
  const status = comp?.status?.type?.description || '';
  const leaders = comp?.competitors?.slice(0, 3) || [];

  return (
    <Link to={`/leaderboard?tour=pga`} className="card card-hover block">
      <div
        className="h-28 bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent 30%, rgba(15,32,68,0.95)), url(${event.images?.[0]?.url || 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=60'})`,
        }}
      >
        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-white font-bold text-sm leading-snug line-clamp-2">{event.name}</p>
        </div>
        <div className="absolute top-2 right-2">
          <LiveBadge status={status} />
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-400 text-xs mb-3 flex items-center gap-1.5">
          <span>📍</span>
          {comp?.venue?.fullName || event.competitions?.[0]?.venue?.fullName || 'TBD'}
        </p>
        {leaders.length > 0 ? (
          <div className="space-y-1.5">
            {leaders.map((p, i) => (
              <div key={p.id || i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 w-4 text-xs font-mono">{i + 1}</span>
                  <span className="text-white font-medium truncate max-w-[120px]">
                    {p.athlete?.shortName || p.athlete?.displayName || 'Unknown'}
                  </span>
                </div>
                <ScoreDisplay score={p.score || 'E'} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-xs">Leaderboard coming soon</p>
        )}
      </div>
    </Link>
  );
}

function NewsCard({ article }) {
  return (
    <a
      href={article.links?.web?.href || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-hover flex gap-4 p-4"
    >
      {article.images?.[0]?.url && (
        <img
          src={article.images[0].url}
          alt={article.headline}
          className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
        />
      )}
      <div className="flex flex-col gap-1 min-w-0">
        <span className="badge-green text-xs self-start">Golf News</span>
        <p className="text-white font-semibold text-sm leading-snug line-clamp-2 mt-1">
          {article.headline}
        </p>
        <p className="text-gray-400 text-xs line-clamp-2">{article.description}</p>
      </div>
    </a>
  );
}

function HeroStats() {
  const stats = [
    { label: 'PGA Events', value: '47', icon: '🏆' },
    { label: 'Active Players', value: '250+', icon: '🏌️' },
    { label: 'World Rankings', value: 'Top 200', icon: '📊' },
    { label: 'Courses', value: '100+', icon: '⛳' },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
      {stats.map((s) => (
        <div key={s.label} className="card p-4 text-center">
          <div className="text-2xl mb-1">{s.icon}</div>
          <div className="text-white font-bold text-xl">{s.value}</div>
          <div className="text-gray-400 text-xs">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [scoreboardData, setScoreboardData] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [loadingBoard, setLoadingBoard] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [errorBoard, setErrorBoard] = useState(null);

  useEffect(() => {
    getScoreboard('pga')
      .then(setScoreboardData)
      .catch((e) => setErrorBoard(e.message))
      .finally(() => setLoadingBoard(false));

    getNews('pga')
      .then(setNewsData)
      .catch(() => {})
      .finally(() => setLoadingNews(false));
  }, []);

  const events = scoreboardData?.events?.slice(0, 6) || [];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-fairway-dark via-fairway-navy to-fairway-dark py-16 px-4">
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-fairway-green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-fairway-gold/5 rounded-full blur-2xl" />
        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-2xl">
            <div className="badge-green mb-4 self-start inline-flex">⛳ Golf Central</div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Track Every{' '}
              <span className="gradient-text">Tournament,</span>
              <br />
              Score & Statistic
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Live leaderboards, competition tracking, world rankings, player stats,
              and in-depth course reviews — all in one place.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/tournaments" className="btn-primary">
                View Tournaments
              </Link>
              <Link to="/leaderboard" className="btn-secondary">
                Live Leaderboard
              </Link>
            </div>
          </div>
          <HeroStats />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Active / Upcoming Tournaments */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title mb-0">🏆 Current &amp; Upcoming Tournaments</h2>
            <Link to="/tournaments" className="text-fairway-lightgreen hover:text-fairway-gold text-sm font-medium transition-colors">
              All Tournaments →
            </Link>
          </div>

          {loadingBoard ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} lines={4} />)}
            </div>
          ) : errorBoard ? (
            <ErrorMessage message={errorBoard} />
          ) : events.length === 0 ? (
            <div className="card p-10 text-center text-gray-400">No active events found.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((ev) => <TournamentCard key={ev.id} event={ev} />)}
            </div>
          )}
        </section>

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="section-title">⚡ Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { to: '/leaderboard', icon: '📊', title: 'Live Leaderboard', desc: 'Real-time scores for all active events' },
              { to: '/tournaments', icon: '🗓️', title: 'Tournament Schedule', desc: 'Full calendar of PGA events & results' },
              { to: '/rankings', icon: '🌍', title: 'World Rankings', desc: 'Official PGA Tour player rankings' },
              { to: '/courses', icon: '⛳', title: 'Course Finder', desc: 'Explore, review & rate golf courses' },
            ].map((item) => (
              <Link key={item.to} to={item.to} className="card card-hover p-5 flex flex-col gap-2">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="text-white font-bold">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest News */}
        <section>
          <h2 className="section-title">📰 Golf News</h2>
          {loadingNews ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} lines={2} />)}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {(newsData?.articles || []).slice(0, 6).map((a, i) => (
                <NewsCard key={a.dataSourceIdentifier || i} article={a} />
              ))}
              {(!newsData?.articles || newsData.articles.length === 0) && (
                <p className="text-gray-500 col-span-2 text-center py-8">No news available right now.</p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
