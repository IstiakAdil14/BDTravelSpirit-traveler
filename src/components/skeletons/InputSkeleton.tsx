import { cn } from "@/lib/utils";

interface InputSkeletonProps {
  width?: string;
  height?: string;
  label?: boolean;
}

const InputSkeleton = ({
  width = "w-full",
  height = "h-10",
  label = false,
}: InputSkeletonProps) => {
  return (
    <div className="space-y-2" aria-label="Loading input">
      {label && <div className="animate-pulse bg-gray-300 h-4 w-20 rounded" />}
      <div
        className={cn(
          "animate-pulse bg-gray-300 border border-gray-200 rounded",
          width,
          height
        )}
      />
    </div>
  );
};

export default InputSkeleton;
