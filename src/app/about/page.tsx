import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Blog Cover Manager works — Next.js, Cloudinary, and the c_fill transformation that keeps every post grid uniform.",
};

const STACK = [
  { label: "Next.js 16", description: "App Router, server components, route handlers" },
  { label: "Cloudinary", description: "c_fill · ar_16:9 · g_auto image transformation" },
  { label: "shadcn/ui", description: "Base UI component library" },
  { label: "Tailwind CSS v4", description: "Utility-first styling" },
  { label: "TypeScript", description: "End-to-end type safety" },
];

const PAGES = [
  {
    route: "/",
    label: "Blog Grid",
    description:
      "The public-facing blog home. Every cover is delivered at exactly 16:9 — no matter what shape was uploaded. Three seed posts show the effect immediately.",
  },
  {
    route: "/admin",
    label: "Admin Upload",
    description:
      "Upload a cover image via the Cloudinary Upload Widget, fill in your post details, pick a category, and publish. The new card appears in the grid instantly.",
  },
  {
    route: "/about",
    label: "About",
    description: "You are here.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-12">
        {/* Hero */}
        <section className="flex flex-col gap-3">
          <Badge variant="secondary" className="w-fit">About this project</Badge>
          <h1 className="text-3xl font-bold tracking-tight">
            Blog Cover Manager
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            A beginner-friendly demo that solves a real problem: blog grids look
            broken when every uploaded image has a different shape. This project
            uses Cloudinary&apos;s on-the-fly transformation pipeline to enforce a
            uniform <strong>16:9</strong> aspect ratio on every cover — no
            Photoshop, no manual cropping, no extra storage.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Upload any image — portrait, square, ultrawide — and Cloudinary&apos;s{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
              g_auto
            </code>{" "}
            gravity model finds the focal point, then{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
              c_fill
            </code>{" "}
            crops around it. The grid stays perfectly aligned every time.
          </p>
        </section>

        <Separator />

        {/* The transformation */}
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">The Transformation</h2>
          <Card>
            <CardContent className="pt-4">
              <pre className="text-sm font-mono text-foreground/80 whitespace-pre-wrap break-all">
                {`c_fill,ar_16:9,g_auto,w_1200,q_auto,f_auto`}
              </pre>
            </CardContent>
          </Card>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li>
              <span className="font-mono text-foreground">c_fill</span> — fills
              the frame completely; no letterboxing or empty space
            </li>
            <li>
              <span className="font-mono text-foreground">ar_16:9</span> — locks
              the ratio; Cloudinary calculates the height automatically
            </li>
            <li>
              <span className="font-mono text-foreground">g_auto</span> — AI
              gravity detection keeps the subject in frame
            </li>
            <li>
              <span className="font-mono text-foreground">q_auto,f_auto</span> —
              optimal quality and format (WebP / AVIF) per browser
            </li>
          </ul>
        </section>

        <Separator />

        {/* Tech stack */}
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Tech Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {STACK.map(({ label, description }) => (
              <Card key={label}>
                <CardHeader className="pb-1 pt-4">
                  <span className="font-medium text-sm">{label}</span>
                </CardHeader>
                <CardContent className="pt-0 pb-4">
                  <p className="text-xs text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Navigation guide */}
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Navigating the Project</h2>
          <div className="flex flex-col gap-3">
            {PAGES.map(({ route, label, description }) => (
              <div key={route} className="flex gap-4">
                <code className="shrink-0 mt-0.5 text-xs font-mono bg-muted px-2 py-1 rounded h-fit">
                  {route}
                </code>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">{label}</span>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* Source */}
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Source Code</h2>
          <p className="text-sm text-muted-foreground">
            The full source is available on GitHub.
          </p>
          <a
            href="https://github.com/musebe/blog-cover-manager"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium underline underline-offset-4 hover:text-foreground/80 transition-colors w-fit"
          >
            github.com/musebe/blog-cover-manager →
          </a>
        </section>
      </main>

      <footer className="border-t mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-xs text-muted-foreground flex flex-col sm:flex-row gap-2 justify-between">
          <span>The Dev Blog — powered by Next.js &amp; Cloudinary</span>
          <span>Images transformed with c_fill · g_auto · ar_16:9</span>
        </div>
      </footer>
    </div>
  );
}
