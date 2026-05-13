"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CoverSkeleton } from "./CoverSkeleton";
import { buildCoverUrl } from "@/lib/cloudinary";
import type { Post } from "@/types";

interface BlogCardProps {
  post: Post;
  /** Pass true for the first card — sets priority + eager loading to fix LCP. */
  priority?: boolean;
}

/**
 * Editorial blog card: image bleeds flush to the top of the card,
 * meta badges overlay the image, gradient fades into the content area.
 */
export function BlogCard({ post, priority = false }: BlogCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const coverUrl = buildCoverUrl(post.publicId, { width: 800 });

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 flex flex-col h-full p-0 gap-0">
      {/* Image — negative margin cancels Card's py-4; rounded-t-xl matches card */}
      <div className="relative rounded-t-xl overflow-hidden">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          {!loaded && !errored && <CoverSkeleton />}

          {!errored && (
            <Image
              src={coverUrl}
              alt={`Cover image for ${post.title}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] ${
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

          {/* Gradient — fades image into card background */}
          {loaded && !errored && (
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-card/90 via-card/20 to-transparent pointer-events-none" />
          )}

          {/* Meta badges overlaid on image */}
          {loaded && !errored && (
            <>
              <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm ring-1 ring-white/10">
                {post.category}
              </span>
              <span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm ring-1 ring-white/10">
                {post.readTime} min read
              </span>
            </>
          )}
        </AspectRatio>
      </div>

      {/* Content */}
      <CardHeader className="pb-1 pt-4">
        <h2 className="text-base font-semibold leading-snug line-clamp-2">
          {post.title}
        </h2>
      </CardHeader>

      <CardContent className="flex-1 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>
      </CardContent>

      <CardFooter className="pt-3 text-xs text-muted-foreground justify-between">
        <span className="font-medium">{post.author}</span>
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
