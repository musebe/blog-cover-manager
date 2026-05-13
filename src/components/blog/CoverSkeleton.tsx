import { Skeleton } from "@/components/ui/skeleton";

/**
 * Holds the exact 16:9 space while the cover image loads.
 * Uses aspect-video (16/9) so the grid never shifts on load.
 */
export function CoverSkeleton() {
  return (
    <div className="w-full aspect-video">
      <Skeleton className="w-full h-full rounded-none" />
    </div>
  );
}
