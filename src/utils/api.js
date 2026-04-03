// ESPN Golf API – no API key required
const ESPN_BASE = 'https://site.api.espn.com/apis/site/v2/sports/golf';

export const TOURS = {
  pga: { id: 'pga', name: 'PGA Tour', shortName: 'PGA' },
  lpga: { id: 'lpga', name: 'LPGA Tour', shortName: 'LPGA' },
  champions: { id: 'pgachampions', name: "PGA Tour Champions", shortName: 'Champions' },
  euro: { id: 'dpworld', name: 'DP World Tour', shortName: 'DP World' },
};

async function fetchESPN(path) {
  const res = await fetch(`${ESPN_BASE}${path}`);
  if (!res.ok) throw new Error(`ESPN API error: ${res.status}`);
  return res.json();
}

// ── Scoreboard / live leaderboard ────────────────────────────────────────────
export async function getScoreboard(tour = 'pga') {
  return fetchESPN(`/${tour}/scoreboard`);
}

// ── Schedule (calendar) ───────────────────────────────────────────────────────
export async function getSchedule(tour = 'pga', year) {
  const y = year || new Date().getFullYear();
  return fetchESPN(`/${tour}/scoreboard?dates=${y}`);
}

// ── Rankings ──────────────────────────────────────────────────────────────────
export async function getRankings(tour = 'pga') {
  return fetchESPN(`/${tour}/rankings`);
}

// ── Single event detail ───────────────────────────────────────────────────────
export async function getEventDetail(tour = 'pga', eventId) {
  return fetchESPN(`/${tour}/scoreboard?event=${eventId}`);
}

// ── Search athletes ───────────────────────────────────────────────────────────
export async function searchAthletes(query) {
  const res = await fetch(
    `https://site.api.espn.com/apis/search/v2?query=${encodeURIComponent(query)}&sport=golf&limit=12`
  );
  if (!res.ok) throw new Error('Search failed');
  return res.json();
}

// ── Athlete bio ───────────────────────────────────────────────────────────────
export async function getAthlete(tour = 'pga', athleteId) {
  return fetchESPN(`/${tour}/athletes/${athleteId}`);
}

// ── News ──────────────────────────────────────────────────────────────────────
export async function getNews(tour = 'pga') {
  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/golf/${tour}/news?limit=12`
  );
  if (!res.ok) throw new Error('News fetch failed');
  return res.json();
}

// ── Helpers ───────────────────────────────────────────────────────────────────
export function formatScore(score, par) {
  if (score === null || score === undefined || score === '-') return '-';
  const diff = typeof par === 'number' ? score - par : null;
  if (diff === null) return score;
  if (diff < 0) return `${diff}`;
  if (diff === 0) return 'E';
  return `+${diff}`;
}

export function scoreClass(score) {
  if (!score || score === 'E' || score === '-') return 'score-even';
  if (score.startsWith('-')) return 'score-under';
  if (score.startsWith('+')) return 'score-over';
  return 'score-even';
}

export function getPositionSuffix(pos) {
  if (!pos) return '';
  const n = parseInt(pos, 10);
  if (isNaN(n)) return pos;
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
