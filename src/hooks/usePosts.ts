"use client";

import { useCallback, useEffect, useState } from "react";
import type { Post } from "@/types";

const STORAGE_KEY = "bcm:posts";

const SEED_POSTS: Post[] = [
  {
    id: "seed-1",
    title: "Getting Started with Next.js 16",
    excerpt:
      "Explore the new features in Next.js 16 and learn how to build fast, scalable web applications.",
    category: "Next.js",
    author: "Alex Rivera",
    readTime: 5,
    publicId: "samples/landscapes/beach-boat",
    publishedAt: "2025-05-01",
  },
  {
    id: "seed-2",
    title: "Mastering Cloudinary Transformations",
    excerpt:
      "A deep dive into c_fill, g_auto and aspect-ratio control for perfectly uniform image grids.",
    category: "Cloudinary",
    author: "Morgan Lee",
    readTime: 7,
    publicId: "samples/food/spices",
    publishedAt: "2025-05-05",
  },
  {
    id: "seed-3",
    title: "Building Scalable UI with shadcn/ui",
    excerpt:
      "How to compose accessible, themeable components using shadcn/ui and Tailwind CSS v4.",
    category: "UI Design",
    author: "Jordan Kim",
    readTime: 6,
    publicId: "samples/bike",
    publishedAt: "2025-05-08",
  },
];

function load(): Post[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Post[]) : SEED_POSTS;
  } catch {
    return SEED_POSTS;
  }
}

function persist(posts: Post[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

/** Manages blog posts with localStorage persistence. */
export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPosts(load());
    setReady(true);
  }, []);

  const addPost = useCallback((post: Post) => {
    setPosts((prev) => {
      const next = [post, ...prev];
      persist(next);
      return next;
    });
  }, []);

  const removePost = useCallback((id: string) => {
    setPosts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      persist(next);
      return next;
    });
  }, []);

  return { posts, addPost, removePost, ready };
}
