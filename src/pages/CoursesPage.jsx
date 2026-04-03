import { useState } from 'react';
import { Link } from 'react-router-dom';
import { COURSES, searchCourses } from '../data/courses';
import { StarRating } from '../components/shared/UI';

const TYPE_COLORS = {
  Private: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Public: 'bg-green-500/20 text-green-300 border-green-500/30',
  Municipal: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Resort: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
};

function DifficultyBar({ level }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((d) => (
          <div
            key={d}
            className={`w-4 h-1.5 rounded-full ${
              d <= level ? 'bg-fairway-lightgreen' : 'bg-white/10'
            }`}
          />
        ))}
      </div>
      <span className="text-gray-400 text-xs">
        {['', 'Easy', 'Moderate', 'Challenging', 'Difficult', 'Extreme'][level]}
      </span>
    </div>
  );
}

function CourseCard({ course }) {
  const typeColor = TYPE_COLORS[course.type] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  return (
    <Link to={`/courses/${course.id}`} className="card card-hover flex flex-col">
      <div
        className="h-44 bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent 40%, rgba(15,32,68,0.97)), url(${course.image})`,
        }}
      >
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${typeColor}`}>
            {course.type}
          </span>
        </div>
        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-white font-bold text-base leading-snug line-clamp-2">{course.name}</p>
          <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
            <span>📍</span>{course.location}
          </p>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StarRating rating={course.rating} />
            <span className="text-fairway-gold font-bold text-sm">{course.rating}</span>
          </div>
          <span className="text-gray-500 text-xs">({course.reviewCount.toLocaleString()} reviews)</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/5 rounded-lg p-2">
            <p className="text-white font-bold text-sm">Par {course.par}</p>
            <p className="text-gray-500 text-xs">Par</p>
          </div>
          <div className="bg-white/5 rounded-lg p-2">
            <p className="text-white font-bold text-sm">{course.yardage.toLocaleString()}</p>
            <p className="text-gray-500 text-xs">Yards</p>
          </div>
          <div className="bg-white/5 rounded-lg p-2">
            <p className="text-white font-bold text-sm">{course.holes}</p>
            <p className="text-gray-500 text-xs">Holes</p>
          </div>
        </div>
        <DifficultyBar level={course.difficulty} />
        {course.hostsTournaments?.length > 0 && (
          <p className="text-fairway-gold text-xs flex items-center gap-1 mt-auto">
            🏆 {course.hostsTournaments[0]}
          </p>
        )}
      </div>
    </Link>
  );
}

export default function CoursesPage() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const results = query ? searchCourses(query) : COURSES;
  const filtered = results.filter(
    (c) => typeFilter === 'all' || c.type === typeFilter
  );

  const types = ['all', ...new Set(COURSES.map((c) => c.type))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white mb-2">Golf Course Finder</h1>
        <p className="text-gray-400">Explore world-class courses, famous holes, and player reviews</p>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, location, tournament…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                typeFilter === t
                  ? 'bg-fairway-green text-white'
                  : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/15'
              }`}
            >
              {t === 'all' ? 'All Types' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <span className="text-5xl block mb-4">⛳</span>
          No courses found matching your search.
        </div>
      ) : (
        <>
          <p className="text-gray-500 text-sm mb-4">{filtered.length} course{filtered.length !== 1 ? 's' : ''} found</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => <CourseCard key={c.id} course={c} />)}
          </div>
        </>
      )}
    </div>
  );
}
