import React, { forwardRef, memo } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  variant?: string | null;
  lines?: number | null;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

const CTASkeleton = memo(forwardRef<HTMLDivElement, Props>(({
  className,
  variant,
  lines = 3,
  isLoading = true,
  size = 'md',
  children,
}, ref) => {
  if (!isLoading) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  const effectiveLines = lines && lines > 0 ? lines : 3;
  const compact = variant === 'compact';

  return (
    <div
      ref={ref}
      className={cn('skeleton-container', className)}
      aria-busy={isLoading}
      style={{
        '--skeleton-height': `var(--skeleton-height-${size})`,
      } as React.CSSProperties}
    >
      <section className={cn("py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden", compact && "py-10")}>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10" />
          <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-pink-500/10 border border-pink-400/20 px-4 py-2 mb-8 animate-pulse">
                  <div className="w-2 h-2 bg-pink-400 rounded-full" />
                  <div className="h-4 bg-gray-300 rounded w-32" />
                </div>
                <div className="space-y-4 mb-6">
                  {Array.from({ length: Math.min(effectiveLines, 2) }).map((_, i) => (
                    <div key={i} className="h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse" style={{ width: i === 1 ? '75%' : '100%' }} />
                  ))}
                </div>
                <div className="space-y-2 mb-8">
                  {Array.from({ length: Math.min(effectiveLines, 3) }).map((_, i) => (
                    <div key={i} className={cn("bg-gray-300 rounded h-4", i === 2 && "w-3/4")} />
                  ))}
                </div>
                <div className="mb-8 space-y-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 animate-pulse">
                      <div className="w-5 h-5 bg-emerald-400 rounded animate-pulse" />
                      <div className="h-4 bg-gray-300 rounded w-64" />
                    </div>
                  ))}
                </div>
                <div className="h-12 bg-gradient-to-r from-pink-500 to-orange-600 rounded-full animate-pulse w-48" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="glass rounded-2xl p-8 text-center animate-pulse">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 mx-auto mb-6" />
                    <div className="h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded mb-2" />
                    <div className="h-4 bg-gray-300 rounded w-20 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Optional live region: uncomment to announce content load */}
      {/* <div aria-live="polite" aria-atomic="true" className="sr-only">Content loaded</div> */}
    </div>
  );
}));

CTASkeleton.displayName = 'CTASkeleton';

export default CTASkeleton;

/*
// Example 1: Usage in App Router server component (SSR fallback, isLoading defaults to true)
import CTASkeleton from './components/CTASkeleton';

export default function Page() {
  return <CTASkeleton lines={3} size="md" />;
}

// Example 2: Usage in client component with state toggle
'use client';
import { useState } from 'react';
import CTASkeleton from './components/CTASkeleton';

export default function ClientComponent() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <CTASkeleton isLoading={isLoading} lines={2}>
      <div>Real CTA content here</div>
    </CTASkeleton>
  );
}
*/
