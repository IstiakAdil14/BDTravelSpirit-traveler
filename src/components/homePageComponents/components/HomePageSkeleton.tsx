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

const HomePageSkeleton = memo(forwardRef<HTMLDivElement, Props>(({
  className,
  variant,
  lines = 1,
  isLoading = true,
  size = 'md',
  children,
}, ref) => {
  if (!isLoading) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  const effectiveLines = lines && lines > 0 ? lines : 1;
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
      <div className={cn('space-y-2', compact && 'space-y-1')} aria-hidden="true" tabIndex={-1}>
        {Array.from({ length: effectiveLines }).map((_, i) => (
          <div
            key={i}
            className="skeleton-line bg-gray-300 rounded"
            style={{
              height: 'var(--skeleton-height)',
              width: i === 0 ? '80%' : i === effectiveLines - 1 ? '60%' : '100%',
            }}
          />
        ))}
      </div>
      {/* Optional live region: uncomment to announce content load */}
      {/* <div aria-live="polite" aria-atomic="true" className="sr-only">Content loaded</div> */}
    </div>
  );
}));

HomePageSkeleton.displayName = 'HomePageSkeleton';

export default HomePageSkeleton;

/*
// Example 1: Usage in App Router server component (SSR fallback, isLoading defaults to true)
import HomePageSkeleton from './components/HomePageSkeleton';

export default function Page() {
  return <HomePageSkeleton lines={3} size="md" />;
}

// Example 2: Usage in client component with state toggle
'use client';
import { useState } from 'react';
import HomePageSkeleton from './components/HomePageSkeleton';

export default function ClientComponent() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <HomePageSkeleton isLoading={isLoading} lines={2}>
      <div>Real content here</div>
    </HomePageSkeleton>
  );
}
*/
