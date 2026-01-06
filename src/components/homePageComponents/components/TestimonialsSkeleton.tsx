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

const TestimonialsSkeleton = memo(forwardRef<HTMLDivElement, Props>(({
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
          <div className="absolute top-20 left-20 w-72 h-72 bg-gray-700 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-700 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-700 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 border border-purple-400/20 px-4 py-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <div className="h-4 bg-gray-300 rounded w-24 animate-pulse" />
            </div>
          </div>
          <div className="text-center mb-16">
            <div className="h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse max-w-2xl mx-auto mb-6" />
            <div className="h-6 bg-gray-300 rounded animate-pulse max-w-xl mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 animate-pulse">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 mb-6" />
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="w-5 h-5 bg-yellow-400 rounded animate-pulse" />
                  ))}
                </div>
                <div className="space-y-2 mb-8">
                  {Array.from({ length: Math.min(effectiveLines, 3) }).map((_, j) => (
                    <div key={j} className={cn("bg-gray-300 rounded h-4", j === 2 && "w-3/4")} />
                  ))}
                </div>
                <div className="border-t border-white/10 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full animate-pulse" />
                    <div>
                      <div className="h-4 bg-gray-300 rounded w-24 mb-2" />
                      <div className="h-3 bg-gray-400 rounded w-20" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i}>
                  <div className="h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-300 rounded w-16 mx-auto" />
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

TestimonialsSkeleton.displayName = 'TestimonialsSkeleton';

export default TestimonialsSkeleton;

/*
// Example 1: Usage in App Router server component (SSR fallback, isLoading defaults to true)
import TestimonialsSkeleton from './components/TestimonialsSkeleton';

export default function Page() {
  return <TestimonialsSkeleton lines={3} size="md" />;
}

// Example 2: Usage in client component with state toggle
'use client';
import { useState } from 'react';
import TestimonialsSkeleton from './components/TestimonialsSkeleton';

export default function ClientComponent() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <TestimonialsSkeleton isLoading={isLoading} lines={2}>
      <div>Real testimonials content here</div>
    </TestimonialsSkeleton>
  );
}
*/
