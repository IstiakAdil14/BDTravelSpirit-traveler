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

const HeroSkeleton = memo(forwardRef<HTMLDivElement, Props>(({
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
      <section className={cn("relative min-h-screen flex items-center justify-center overflow-hidden", compact && "min-h-0")}>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/50 to-slate-900/70" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <div className="h-4 bg-gray-300 rounded w-32 animate-pulse" />
            </div>
            <div className="space-y-4 mb-6">
              {Array.from({ length: Math.min(effectiveLines, 2) }).map((_, i) => (
                <div key={i} className="h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse" style={{ width: i === 1 ? '75%' : '100%' }} />
              ))}
            </div>
            <div className="h-6 bg-gray-300 rounded animate-pulse max-w-2xl mx-auto mb-12" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <div className="h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-pulse w-48" />
              <div className="h-12 border-2 border-white/30 rounded-full animate-pulse w-40" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="text-center">
                  <div className="h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-16 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Optional live region: uncomment to announce content load */}
      {/* <div aria-live="polite" aria-atomic="true" className="sr-only">Content loaded</div> */}
    </div>
  );
}));

HeroSkeleton.displayName = 'HeroSkeleton';

export default HeroSkeleton;

/*
// Example 1: Usage in App Router server component (SSR fallback, isLoading defaults to true)
import HeroSkeleton from './components/HeroSkeleton';

export default function Page() {
  return <HeroSkeleton lines={3} size="md" />;
}

// Example 2: Usage in client component with state toggle
'use client';
import { useState } from 'react';
import HeroSkeleton from './components/HeroSkeleton';

export default function ClientComponent() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <HeroSkeleton isLoading={isLoading} lines={2}>
      <div>Real hero content here</div>
    </HeroSkeleton>
  );
}
*/
