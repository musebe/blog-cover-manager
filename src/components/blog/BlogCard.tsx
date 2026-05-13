"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CoverSkeleton } from "./CoverSkeleton";
import { buildCoverUrl } from "@/lib/cloudinary";
import type { Post } from "@/types";

interface BlogCardProps {
  post: Post;
}

/**
 * Renders a blog post card with a Cloudinary-optimised 16:9 cover.
 * Shows a skeleton while the image loads to prevent layout shift.
 */
export function BlogCard({ post }: BlogCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const coverUrl = buildCoverUrl(post.publicId, { width: 800 });

  return (
    <Card className="overflow-hidden group transition-shadow hover:shadow-lg flex flex-col h-full">
      {/* Cover image — always 16:9 */}
      <div className="relative w-full aspect-video overflow-hidden bg-muted">
        {!loaded && !errored && <CoverSkeleton />}

        {!errored && (
          <Image
            src={coverUrl}
            alt={`Cover image for ${post.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setLoaded(true)}
            onError={() => {
              setLoaded(true);
              setErrored(true);
            }}
          />
        )}

        {errored && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-sm">
            No image
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className="text-xs">
            {post.category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {post.readTime} min read
          </span>
        </div>
        <h2 className="text-lg font-semibold leading-snug mt-2 line-clamp-2">
          {post.title}
        </h2>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>
      </CardContent>

      <CardFooter className="pt-0 text-xs text-muted-foreground flex justify-between">
        <span>{post.author}</span>
        <time dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
      </CardFooter>
    </Card>
  );
}
