import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseById } from '../data/courses';
import { StarRating } from '../components/shared/UI';

const TYPE_COLORS = {
  Private:   'bg-purple-500/20 text-purple-300 border border-purple-500/30',
  Public:    'bg-green-500/20 text-green-300 border border-green-500/30',
  Municipal: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  Resort:    'bg-amber-500/20 text-amber-300 border border-amber-500/30',
};

function ReviewForm({ onSubmit }) {
  const [form, setForm] = useState({ author: '', rating: 5, text: '' });
  const [submitted, setSubmitted] = useState(false);

  function handle(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function submit(e) {
    e.preventDefault();
    if (!form.author.trim() || !form.text.trim()) return;
    onSubmit({ ...form, rating: Number(form.rating), date: new Date().toISOString().slice(0, 10) });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="card p-6 text-center">
        <span className="text-4xl block mb-3">🎉</span>
        <p className="text-white font-semibold">Thanks for your review!</p>
        <p className="text-gray-400 text-sm mt-1">Your review has been added.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card p-6 space-y-4">
      <h3 className="text-white font-bold text-lg">Write a Review</h3>
      <div>
        <label className="text-gray-400 text-sm mb-1 block">Your Name</label>
        <input name="author" value={form.author} onChange={handle} required className="input-field" placeholder="e.g. John D." />
      </div>
      <div>
        <label className="text-gray-400 text-sm mb-1 block">Rating</label>
        <select name="rating" value={form.rating} onChange={handle} className="input-field">
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{'⭐'.repeat(r)} – {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][r]}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-gray-400 text-sm mb-1 block">Your Review</label>
        <textarea
          name="text"
          value={form.text}
          onChange={handle}
          required
          rows={4}
          className="input-field resize-none"
          placeholder="Share your experience…"
        />
      </div>
      <button type="submit" className="btn-primary w-full justify-center">
        Submit Review
      </button>
    </form>
  );
}

export default function CourseDetailPage() {
  const { id } = useParams();
  const course = getCourseById(id);
  const [localReviews, setLocalReviews] = useState([]);
  const [tab, setTab] = useState('overview');

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <span className="text-5xl block mb-4">⛳</span>
        <h2 className="text-white font-bold text-2xl mb-3">Course Not Found</h2>
        <Link to="/courses" className="btn-primary inline-flex">← Back to Courses</Link>
      </div>
    );
  }

  const allReviews = [...localReviews, ...course.reviews];
  const avgRating = allReviews.length
    ? (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1)
    : course.rating;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/courses" className="hover:text-white transition-colors">Courses</Link>
        <span>/</span>
        <span className="text-gray-300">{course.name}</span>
      </div>

      {/* Hero Image */}
      <div
        className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-8"
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent 30%, rgba(10,22,40,0.95)), url(${course.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TYPE_COLORS[course.type] || ''}`}>
              {course.type}
            </span>
            {course.hostsTournaments?.map((t) => (
              <span key={t} className="badge-green text-xs">🏆 {t}</span>
            ))}
          </div>
          <h1 className="font-display text-3xl font-bold text-white">{course.name}</h1>
          <p className="text-gray-300 flex items-center gap-1.5 mt-1">
            <span>📍</span>{course.location}
          </p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Par', value: course.par },
          { label: 'Yardage', value: course.yardage.toLocaleString() },
          { label: 'Year Opened', value: course.yearOpened },
          { label: 'Holes', value: course.holes },
        ].map((s) => (
          <div key={s.label} className="stat-card text-center">
            <span className="text-white font-bold text-2xl">{s.value}</span>
            <span className="text-gray-400 text-xs">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-white/10 pb-1 overflow-x-auto">
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'holes', label: 'Famous Holes' },
          { key: 'reviews', label: `Reviews (${allReviews.length})` },
          { key: 'write', label: '✏️ Write Review' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`tab-btn whitespace-nowrap ${tab === key ? 'tab-active' : 'tab-inactive'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <h3 className="text-white font-bold mb-3">About This Course</h3>
              <p className="text-gray-300 leading-relaxed">{course.description}</p>
            </div>
            <div className="card p-6">
              <h3 className="text-white font-bold mb-4">Course Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'Designer', value: course.designer },
                  { label: 'Year Opened', value: course.yearOpened },
                  { label: 'Type', value: course.type },
                  { label: 'Location', value: course.location },
                ].map((d) => (
                  <div key={d.label} className="bg-white/5 rounded-xl p-3">
                    <p className="text-gray-500 text-xs">{d.label}</p>
                    <p className="text-white font-medium mt-0.5">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>
            {course.amenities?.length > 0 && (
              <div className="card p-6">
                <h3 className="text-white font-bold mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {course.amenities.map((a) => (
                    <span key={a} className="badge-green">{a}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Sidebar */}
          <div className="space-y-4">
            <div className="card p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl font-bold gradient-text">{avgRating}</span>
                <div>
                  <StarRating rating={Number(avgRating)} />
                  <p className="text-gray-500 text-xs mt-0.5">{allReviews.length} reviews</p>
                </div>
              </div>
              <div className="space-y-2">
                {[5,4,3,2,1].map((star) => {
                  const count = allReviews.filter((r) => Math.round(r.rating) === star).length;
                  const pct = allReviews.length ? Math.round((count / allReviews.length) * 100) : 0;
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="text-gray-400 w-3">{star}</span>
                      <span className="text-fairway-gold text-xs">★</span>
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-fairway-gold rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-gray-500 w-8 text-right">{pct}%</span>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => setTab('write')} className="btn-primary w-full justify-center mt-4 text-sm">
                Write a Review
              </button>
            </div>
            {course.hostsTournaments?.length > 0 && (
              <div className="card p-5">
                <h4 className="text-white font-bold mb-3">🏆 Hosted Tournaments</h4>
                <ul className="space-y-2">
                  {course.hostsTournaments.map((t) => (
                    <li key={t} className="text-gray-300 text-sm flex items-center gap-2">
                      <span className="text-fairway-gold">•</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'holes' && (
        <div className="grid sm:grid-cols-2 gap-4">
          {(course.famousHoles || []).map((hole) => (
            <div key={hole.hole} className="card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-fairway-green/20 rounded-full flex items-center justify-center text-fairway-lightgreen font-bold">
                  {hole.hole}
                </div>
                <div>
                  <p className="text-white font-bold">{hole.name}</p>
                  <p className="text-gray-500 text-xs">Hole {hole.hole}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{hole.description}</p>
            </div>
          ))}
          {(!course.famousHoles || course.famousHoles.length === 0) && (
            <p className="text-gray-500 col-span-2 text-center py-10">No hole info available.</p>
          )}
        </div>
      )}

      {tab === 'reviews' && (
        <div className="space-y-4">
          {allReviews.length === 0 ? (
            <div className="card p-10 text-center">
              <span className="text-4xl block mb-3">💬</span>
              <p className="text-gray-400">No reviews yet. Be the first!</p>
              <button onClick={() => setTab('write')} className="btn-primary mt-4">Write a Review</button>
            </div>
          ) : (
            allReviews.map((rev, i) => (
              <div key={i} className="card p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-white font-semibold">{rev.author}</p>
                    <p className="text-gray-500 text-xs">{rev.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarRating rating={rev.rating} />
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{rev.text}</p>
              </div>
            ))
          )}
        </div>
      )}

      {tab === 'write' && (
        <div className="max-w-lg">
          <ReviewForm onSubmit={(rev) => setLocalReviews((r) => [rev, ...r])} />
        </div>
      )}
    </div>
  );
}
