export default function Footer() {
  return (
    <footer className="bg-fairway-navy border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">⛳</span>
              <span className="font-display text-lg font-bold text-white">Fairway</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your all-in-one golf hub for live scores, tournament tracking,
              player rankings, and course information.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/tournaments" className="hover:text-white transition-colors">Tournaments</a></li>
              <li><a href="/leaderboard" className="hover:text-white transition-colors">Leaderboard</a></li>
              <li><a href="/rankings" className="hover:text-white transition-colors">Rankings</a></li>
              <li><a href="/courses" className="hover:text-white transition-colors">Courses</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Data Sources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Live scores via ESPN Golf API</li>
              <li>Rankings via ESPN Sports API</li>
              <li>Course data curated in-house</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} Fairway. All rights reserved.</span>
          <span>Live data powered by ESPN Golf API</span>
        </div>
      </div>
    </footer>
  );
}
