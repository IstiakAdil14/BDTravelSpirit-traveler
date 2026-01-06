import { cn } from "@/lib/utils";

interface CardSkeletonProps {
  showImage?: boolean;
  showAvatar?: boolean;
  lines?: number;
  width?: string;
}

const CardSkeleton = ({
  showImage = false,
  showAvatar = false,
  lines = 3,
  width = "w-full",
}: CardSkeletonProps) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-white border border-gray-200 rounded-lg p-4 shadow-sm",
        width
      )}
      aria-label="Loading card"
    >
      {showImage && (
        <div className="h-32 bg-gray-300 rounded mb-4" />
      )}
      {showAvatar && (
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-10 w-10 bg-gray-300 rounded-full" />
          <div className="space-y-1">
            <div className="h-4 bg-gray-300 rounded w-20" />
            <div className="h-3 bg-gray-300 rounded w-16" />
          </div>
        </div>
      )}
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "bg-gray-300 rounded h-4",
              index === 0 ? "w-3/4" : index === lines - 1 ? "w-1/2" : "w-full"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSkeleton;
