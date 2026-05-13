# Blog Cover Manager

> **Next.js + Cloudinary demo** — automatically crop every blog cover to a uniform 16:9 ratio using `c_fill`, `g_auto`, and `ar_16:9`, so your post grid always looks intentional.

**GitHub:** https://github.com/musebe/blog-cover-manager

---

## The Problem

Blog post grids look messy when uploaded cover images have inconsistent aspect ratios — portrait photos next to landscape screenshots next to square thumbnails.

## The Solution

Upload any image in any shape. Cloudinary transforms it on-the-fly to a perfect 16:9 ratio using smart gravity detection (`g_auto`) — no manual cropping or resizing needed.

```
c_fill,ar_16:9,g_auto,w_1200,q_auto,f_auto
```

| Before | After |
|--------|-------|
| Random sizes and shapes | Uniform 16:9 grid, every time |

---

## Features

- **Fill Crop** (`c_fill`) — fills the target dimensions without distortion
- **Aspect Ratio Control** (`ar_16:9`) — enforces a consistent 16:9 ratio across all covers
- **Smart Gravity** (`g_auto`) — Cloudinary detects the focal point and keeps the most important content in frame
- **Loading Skeletons** — shadcn `AspectRatio` + `Skeleton` hold the exact 16:9 space while images load, preventing layout shift
- **LCP Optimized** — first card uses `priority` on `next/image` (`loading=eager` + `fetchpriority=high`)
- **Admin Upload Page** — upload a cover, fill in post details, publish to the blog grid
- **SEO Ready** — OpenGraph metadata on the root layout and home page

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (Base UI) |
| Image CDN | Cloudinary |
| Language | TypeScript |
| Data layer | `localStorage` (demo) |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/musebe/blog-cover-manager
cd blog-cover-manager
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your Cloudinary credentials:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

> **Get your cloud name** from the [Cloudinary Console](https://console.cloudinary.com).
>
> **Create an upload preset**: Settings → Upload → Upload presets → Add upload preset → set to **Unsigned**.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Blog post grid — all covers uniformly 16:9 |
| `/admin` | Upload a cover image and create a new post |

---

## How the Transformation Works

Every cover URL is built in [`src/lib/cloudinary.ts`](src/lib/cloudinary.ts):

```ts
const transforms = [
  "c_fill",   // fill the frame (no letterboxing)
  "ar_16:9",  // lock aspect ratio — Cloudinary calculates height
  "g_auto",   // smart gravity — keeps the subject in frame
  "w_800",    // deliver at 800px wide
  "q_auto",   // automatic quality compression
  "f_auto",   // serve WebP/AVIF based on browser support
].join(",");

return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms}/${publicId}`;
```

Upload a portrait photo, a square screenshot, or a wide panorama — Cloudinary's `g_auto` finds the focal point and `c_fill` crops around it. The grid stays perfectly uniform.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout — Cloudinary widget script
│   ├── page.tsx            # Blog home (server) — SEO metadata
│   └── admin/
│       └── page.tsx        # Admin upload page
├── components/
│   └── blog/
│       ├── BlogCard.tsx    # Card with flush image bleed + overlay badges
│       ├── BlogGrid.tsx    # Responsive 3-col grid
│       ├── BlogHome.tsx    # Client wrapper — wires usePosts → BlogGrid
│       ├── CoverSkeleton.tsx # AspectRatio skeleton (no layout shift)
│       └── UploadWidget.tsx  # Cloudinary Upload Widget (unsigned)
├── hooks/
│   └── usePosts.ts         # localStorage post store with seed data
├── lib/
│   └── cloudinary.ts       # buildCoverUrl — transformation URL builder
└── types/
    └── index.ts            # Post, CloudinaryUploadResult
```

---

## Key Implementation Notes

**Upload Widget initialization** — the Cloudinary script is loaded via `next/script strategy="afterInteractive"` in the root layout. The widget polls for `createUploadWidget` availability (every 100ms, 10s timeout) before initializing to avoid async race conditions.

**No layout shift** — every image container uses shadcn `AspectRatio` with `ratio={16/9}`. The `CoverSkeleton` fills the same space during load so nothing jumps.

**Data layer** — posts are stored in `localStorage` for this demo. Replace `usePosts` with a database query (Postgres, Sanity, etc.) to make it production-ready.

---

## License

MIT
