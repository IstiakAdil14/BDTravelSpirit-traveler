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

const HowItWorksSkeleton = memo(forwardRef<HTMLDivElement, Props>(({
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
      <section className={cn("py-20 bg-gradient-to-br from-gray-50 to-white", compact && "py-10")}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-400/20 px-4 py-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <div className="h-4 bg-gray-300 rounded w-28 animate-pulse" />
            </div>
          </div>
          <div className="text-center mb-16">
            <div className="h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-pulse max-w-2xl mx-auto mb-6" />
            <div className="h-6 bg-gray-300 rounded animate-pulse max-w-xl mx-auto" />
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
              <div className="h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full animate-pulse" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse mb-6 mx-auto lg:mx-0" />
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 animate-pulse">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 mb-6" />
                    <div className="h-6 bg-gray-300 rounded mb-4" />
                    <div className="space-y-2">
                      {Array.from({ length: Math.min(effectiveLines, 3) }).map((_, j) => (
                        <div key={j} className={cn("bg-gray-300 rounded h-4", j === 2 && "w-3/4")} />
                      ))}
                    </div>
                    <div className="mt-6 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-300" />
                      <div className="h-4 bg-gray-300 rounded w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-16">
            <div className="h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-pulse w-48 mx-auto" />
          </div>
        </div>
      </section>
      {/* Optional live region: uncomment to announce content load */}
      {/* <div aria-live="polite" aria-atomic="true" className="sr-only">Content loaded</div> */}
    </div>
  );
}));

HowItWorksSkeleton.displayName = 'HowItWorksSkeleton';

export default HowItWorksSkeleton;

/*
// Example 1: Usage in App Router server component (SSR fallback, isLoading defaults to true)
import HowItWorksSkeleton from './components/HowItWorksSkeleton';

export default function Page() {
  return <HowItWorksSkeleton lines={3} size="md" />;
}

// Example 2: Usage in client component with state toggle
'use client';
import { useState } from 'react';
import HowItWorksSkeleton from './components/HowItWorksSkeleton';

export default function ClientComponent() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <HowItWorksSkeleton isLoading={isLoading} lines={2}>
      <div>Real how it works content here</div>
    </HowItWorksSkeleton>
  );
}
*/
