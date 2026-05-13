/** Builds a Cloudinary delivery URL without depending on browser APIs. */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";

/** Parameters for a fill-cropped cover image URL. */
interface CoverOptions {
  width?: number;
  height?: number;
  quality?: string;
  format?: string;
}

/**
 * Returns a 16:9 fill-cropped Cloudinary URL for a blog cover.
 * Uses c_fill + g_auto for smart gravity and ar_16:9 for consistent ratio.
 */
export function buildCoverUrl(
  publicId: string,
  { width = 1200, quality = "auto", format = "auto" }: CoverOptions = {}
): string {
  // ar_16:9 removes need to hard-code height — Cloudinary computes it
  const transforms = [
    "c_fill",
    "ar_16:9",
    "g_auto",
    `w_${width}`,
    `q_${quality}`,
    `f_${format}`,
  ].join(",");

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

export const UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "";

export { CLOUD_NAME };
