# ⛳ Fairway – Golf Tournament Tracker

A clean, modern, and slick web app for tracking golf tournaments, competitions, live leaderboards, player rankings, and exploring world-class golf courses.

## Features

### 🏆 Tournament & Competition Tracking
- Track **all active, upcoming, and completed tournaments** across PGA Tour, LPGA, PGA Tour Champions, and DP World Tour
- Filter by status: **Live**, **Upcoming**, and **Completed**
- Real-time event status with live indicators
- Click any tournament to view its full leaderboard

### 📊 Live Leaderboard
- Real-time scores for all active events
- Full player standings with round-by-round scores
- Color-coded scoring: red = under par, blue = over par, grey = even
- Leader display with thru-hole indicator

### 🌍 World Rankings
- Official PGA Tour player rankings
- Trend indicators (up/down/unchanged)
- Search by player name or country

### ⛳ Golf Course Finder
- Browse 6 iconic world-class courses (Augusta, Pebble Beach, St Andrews, Torrey Pines, TPC Sawgrass, Royal Melbourne)
- Filter by type: Public, Private, Municipal, Resort
- Search by name, location, designer, or hosted tournament
- **Famous holes** with descriptions
- **Star ratings** and player **reviews**
- Write your own course reviews

## Technology

- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS 3
- **Routing:** React Router 6
- **Data:** [ESPN Golf API](https://site.api.espn.com/apis/site/v2/sports/golf) — **no API key required**
- **Course data:** Curated static database

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

## API

All live data is sourced from ESPN's public Golf API — **completely free and requires no API key**:
- `https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard` — PGA Tour live scores
- `https://site.api.espn.com/apis/site/v2/sports/golf/pga/rankings` — Player rankings
- `https://site.api.espn.com/apis/site/v2/sports/golf/pga/news` — Latest golf news
