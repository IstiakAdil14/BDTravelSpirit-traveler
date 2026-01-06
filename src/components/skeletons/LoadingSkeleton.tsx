import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  variant?: "full-screen" | "section" | "text" | "card" | "list";
  lines?: number;
  showImage?: boolean;
  cardCount?: number;
}

const LoadingSkeleton = ({
  variant = "section",
  lines = 3,
  showImage = false,
  cardCount = 1,
}: LoadingSkeletonProps) => {


  if (variant === "full-screen") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (variant === "text") {
    return (
      <div className="animate-pulse space-y-2" aria-label="Loading content">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "bg-gray-300 rounded",
              index === lines - 1 ? "w-3/4" : "w-full",
              "h-4"
            )}
          ></div>
        ))}
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className="animate-pulse space-y-4" aria-label="Loading cards">
        {Array.from({ length: cardCount }).map((_, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            {showImage && (
              <div className="h-32 bg-gray-300 rounded mb-4"></div>
            )}
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="animate-pulse space-y-3" aria-label="Loading list">
        {Array.from({ length: lines }).map((_, index) => (
          <div key={index} className="flex items-center space-x-3">
            {showImage && (
              <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            )}
            <div className="flex-1 space-y-1">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default section variant (improved spinner with skeleton elements)
  return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-pulse space-y-4 text-center">
        <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
