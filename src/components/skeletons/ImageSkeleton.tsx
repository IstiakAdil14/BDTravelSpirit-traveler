import { cn } from "@/lib/utils";

interface ImageSkeletonProps {
  width?: string;
  height?: string;
  rounded?: boolean;
  aspectRatio?: string;
}

const ImageSkeleton = ({
  width = "w-full",
  height = "h-48",
  rounded = false,
  aspectRatio,
}: ImageSkeletonProps) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-300",
        width,
        height,
        rounded ? "rounded-full" : "rounded",
        aspectRatio
      )}
      aria-label="Loading image"
    />
  );
};

export default ImageSkeleton;
