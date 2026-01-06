import { cn } from "@/lib/utils";

interface ButtonSkeletonProps {
  width?: string;
  height?: string;
  rounded?: boolean;
}

const ButtonSkeleton = ({
  width = "w-24",
  height = "h-10",
  rounded = false,
}: ButtonSkeletonProps) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-300",
        width,
        height,
        rounded ? "rounded-full" : "rounded"
      )}
      aria-label="Loading button"
    />
  );
};

export default ButtonSkeleton;
