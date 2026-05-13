"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { UploadWidget } from "@/components/blog/UploadWidget";
import { usePosts } from "@/hooks/usePosts";
import { buildCoverUrl } from "@/lib/cloudinary";
import type { CloudinaryUploadResult, Post } from "@/types";

const CATEGORIES = [
  "Next.js",
  "Cloudinary",
  "UI Design",
  "Performance",
  "Tutorial",
  "Other",
];

const DEFAULT_FORM = {
  title: "",
  excerpt: "",
  author: "",
  category: "Tutorial",
  readTime: 5,
};

/** Admin page for creating blog posts with a Cloudinary cover. */
export default function AdminPage() {
  const formId = useId();
  const router = useRouter();
  const { addPost } = usePosts();

  const [form, setForm] = useState(DEFAULT_FORM);
  const [publicId, setPublicId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function handleField(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleUploadSuccess(result: CloudinaryUploadResult) {
    setPublicId(result.public_id);
    setPreviewUrl(buildCoverUrl(result.public_id, { width: 800 }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!publicId) return;

    const post: Post = {
      id: crypto.randomUUID(),
      ...form,
      readTime: Number(form.readTime),
      publicId,
      publishedAt: new Date().toISOString().split("T")[0],
    };

    addPost(post);
    router.push("/");
  }

  const isValid = publicId && form.title.trim() && form.excerpt.trim();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        action={
          <a
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to blog
          </a>
        }
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <form
          id={formId}
          onSubmit={handleSubmit}
          className="flex flex-col gap-8"
        >
          {/* Cover upload */}
          <section className="flex flex-col gap-4">
            <div>
              <h2 className="text-sm font-semibold">Cover Image</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Cloudinary automatically crops to a uniform 16:9 ratio using
                smart gravity.
              </p>
            </div>

            {/* Preview — AspectRatio locks 16:9 so the form doesn't jump */}
            <AspectRatio
              ratio={16 / 9}
              className="rounded-lg overflow-hidden border bg-muted flex items-center justify-center"
            >
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Cover preview"
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  No cover uploaded yet
                </p>
              )}
            </AspectRatio>

            <UploadWidget
              onSuccess={handleUploadSuccess}
              label={publicId ? "Replace Cover Image" : "Upload Cover Image"}
            />

            {publicId && (
              <p className="text-xs text-muted-foreground font-mono truncate">
                public_id: {publicId}
              </p>
            )}
          </section>

          {/* Post details */}
          <section className="flex flex-col gap-5">
            <h2 className="text-sm font-semibold">Post Details</h2>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${formId}-title`}>Title *</Label>
              <Input
                id={`${formId}-title`}
                name="title"
                value={form.title}
                onChange={handleField}
                placeholder="Getting Started with Next.js 16"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${formId}-excerpt`}>Excerpt *</Label>
              <Textarea
                id={`${formId}-excerpt`}
                name="excerpt"
                value={form.excerpt}
                onChange={handleField}
                placeholder="A short summary shown on the blog grid…"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`${formId}-author`}>Author</Label>
                <Input
                  id={`${formId}-author`}
                  name="author"
                  value={form.author}
                  onChange={handleField}
                  placeholder="Your name"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`${formId}-readTime`}>Read time (min)</Label>
                <Input
                  id={`${formId}-readTime`}
                  name="readTime"
                  type="number"
                  min={1}
                  max={60}
                  value={form.readTime}
                  onChange={handleField}
                />
              </div>
            </div>

            {/* Category picker */}
            <div className="flex flex-col gap-1.5">
              <Label>Category</Label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, category: cat }))
                    }
                  >
                    <Badge
                      variant={form.category === cat ? "default" : "outline"}
                      className="cursor-pointer"
                    >
                      {cat}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <Button
            type="submit"
            disabled={!isValid}
            className="w-full sm:w-auto self-start"
            size="lg"
          >
            Publish Post
          </Button>
        </form>
      </main>
    </div>
  );
}
