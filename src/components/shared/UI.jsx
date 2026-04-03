export function LoadingSpinner({ size = 'md' }) {
  const sz = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-10 h-10' : 'w-7 h-7';
  return (
    <div className={`${sz} border-2 border-white/20 border-t-fairway-lightgreen rounded-full animate-spin`} />
  );
}

export function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <LoadingSpinner size="lg" />
      <p className="text-gray-400 text-sm">Loading…</p>
    </div>
  );
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <span className="text-4xl">⚠️</span>
      <p className="text-gray-400 text-sm max-w-sm">
        {message || 'Something went wrong. Please try again.'}
      </p>
      {onRetry && (
        <button className="btn-secondary text-sm" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ icon = '🏌️', title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
      <span className="text-5xl">{icon}</span>
      <p className="text-white font-semibold text-lg">{title}</p>
      {subtitle && <p className="text-gray-400 text-sm max-w-xs">{subtitle}</p>}
    </div>
  );
}

export function SkeletonCard({ lines = 3 }) {
  return (
    <div className="card p-5 animate-pulse">
      <div className="loading-skeleton h-5 w-2/3 mb-4" />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`loading-skeleton h-3.5 mb-2 ${i === lines - 1 ? 'w-1/2' : 'w-full'}`} />
      ))}
    </div>
  );
}

export function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`w-4 h-4 ${s <= Math.round(rating) ? 'text-fairway-gold' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}
