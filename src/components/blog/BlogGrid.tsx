"use client";

import { BlogCard } from "./BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Post } from "@/types";

interface BlogGridProps {
  posts: Post[];
  ready: boolean;
}

/** Renders a responsive 3-column grid of blog post cards. */
export function BlogGrid({ posts, ready }: BlogGridProps) {
  if (!ready) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton className="w-full aspect-video rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
        <p className="text-muted-foreground text-lg font-medium">
          No posts yet.
        </p>
        <p className="text-sm text-muted-foreground">
          Head to{" "}
          <a href="/admin" className="underline underline-offset-4">
            Admin
          </a>{" "}
          to upload your first cover.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
