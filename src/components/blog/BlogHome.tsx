"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BlogGrid } from "./BlogGrid";
import { usePosts } from "@/hooks/usePosts";

/** Client component that wires usePosts → BlogGrid. */
export function BlogHome() {
  const { posts, ready } = usePosts();

  return (
    <div className="min-h-screen bg-background">
      {/* Site header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <span className="font-semibold tracking-tight">The Dev Blog</span>
          <Link href="/admin" className={cn(buttonVariants({ size: "sm" }))}>
            + New Post
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Latest Posts</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Every cover is automatically cropped to 16:9 by Cloudinary —
            no manual resizing needed.
          </p>
        </div>

        <BlogGrid posts={posts} ready={ready} />
      </main>

      <footer className="border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-xs text-muted-foreground flex flex-col sm:flex-row gap-2 justify-between">
          <span>The Dev Blog — powered by Next.js & Cloudinary</span>
          <span>Images transformed with c_fill · g_auto · ar_16:9</span>
        </div>
      </footer>
    </div>
  );
}
