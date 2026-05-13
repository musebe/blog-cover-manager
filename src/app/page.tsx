import type { Metadata } from "next";
import { BlogHome } from "@/components/blog/BlogHome";

export const metadata: Metadata = {
  title: "The Dev Blog — Consistent Cover Images with Cloudinary",
  description:
    "A Next.js blog that uses Cloudinary fill-crop (c_fill, g_auto, ar_16:9) to keep every post cover perfectly uniform.",
  openGraph: {
    title: "The Dev Blog",
    description: "Beautifully uniform blog covers powered by Cloudinary.",
    type: "website",
  },
};

/**
 * Blog home — static shell; all data is client-side from localStorage.
 * BlogHome is a client component so it is rendered inside this server page.
 */
export default function HomePage() {
  return <BlogHome />;
}
