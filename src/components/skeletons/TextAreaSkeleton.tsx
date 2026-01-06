import { cn } from "@/lib/utils";

interface TextAreaSkeletonProps {
  width?: string;
  height?: string;
  lines?: number;
  label?: boolean;
}

const TextAreaSkeleton = ({
  width = "w-full",
  height = "h-24",
  lines = 3,
  label = false,
}: TextAreaSkeletonProps) => {
  return (
    <div className="space-y-2" aria-label="Loading text area">
      {label && <div className="animate-pulse bg-gray-300 h-4 w-24 rounded" />}
      <div
        className={cn(
          "animate-pulse bg-gray-300 border border-gray-200 rounded p-2",
          width,
          height
        )}
      >
        <div className="space-y-1">
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "bg-gray-200 rounded h-3",
                index === lines - 1 ? "w-3/4" : "w-full"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextAreaSkeleton;
