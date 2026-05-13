import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Holds the exact 16:9 space while the cover image loads.
 * AspectRatio locks the ratio so the grid never shifts on load.
 */
export function CoverSkeleton() {
  return (
    <AspectRatio ratio={16 / 9}>
      <Skeleton className="w-full h-full rounded-none" />
    </AspectRatio>
  );
}
