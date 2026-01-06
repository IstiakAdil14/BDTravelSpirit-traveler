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

const FeaturesSkeleton = memo(forwardRef<HTMLDivElement, Props>(({
  className,
  variant,
  lines = 2,
  isLoading = true,
  size = 'md',
  children,
}, ref) => {
  if (!isLoading) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  const effectiveLines = lines && lines > 0 ? lines : 2;
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
      <section className={cn("py-20 bg-white", compact && "py-10")}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 px-4 py-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <div className="h-4 bg-gray-300 rounded w-24 animate-pulse" />
            </div>
          </div>
          <div className="text-center mb-16">
            <div className="h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse max-w-2xl mx-auto mb-6" />
            <div className="h-6 bg-gray-300 rounded animate-pulse max-w-xl mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl p-8 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse">
                <div className="w-16 h-16 rounded-full bg-gray-300 mb-6" />
                <div className="h-6 bg-gray-300 rounded mb-4" />
                <div className="space-y-2">
                  {Array.from({ length: Math.min(effectiveLines, 2) }).map((_, j) => (
                    <div key={j} className={cn("bg-gray-300 rounded h-4", j === 1 && "w-3/4")} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <div className="rounded-2xl p-8 bg-gray-100 animate-pulse">
              <div className="h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded mb-2" />
              <div className="h-4 bg-gray-300 rounded w-20 mx-auto" />
            </div>
            <div className="rounded-2xl p-8 bg-gray-100 animate-pulse">
              <div className="h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded mb-2" />
              <div className="h-4 bg-gray-300 rounded w-24 mx-auto" />
            </div>
            <div className="rounded-2xl p-8 bg-gray-100 animate-pulse md:col-span-1 col-span-2">
              <div className="h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded mb-2" />
              <div className="h-4 bg-gray-300 rounded w-28 mx-auto" />
            </div>
          </div>
        </div>
      </section>
      {/* Optional live region: uncomment to announce content load */}
      {/* <div aria-live="polite" aria-atomic="true" className="sr-only">Content loaded</div> */}
    </div>
  );
}));

FeaturesSkeleton.displayName = 'FeaturesSkeleton';

export default FeaturesSkeleton;

/*
// Example 1: Usage in App Router server component (SSR fallback, isLoading defaults to true)
import FeaturesSkeleton from './components/FeaturesSkeleton';

export default function Page() {
  return <FeaturesSkeleton lines={2} size="md" />;
}

// Example 2: Usage in client component with state toggle
'use client';
import { useState } from 'react';
import FeaturesSkeleton from './components/FeaturesSkeleton';

export default function ClientComponent() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <FeaturesSkeleton isLoading={isLoading} lines={1}>
      <div>Real features content here</div>
    </FeaturesSkeleton>
  );
}
*/
