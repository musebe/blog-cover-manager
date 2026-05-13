/** A single blog post stored in localStorage. */
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: number;
  publicId: string;
  publishedAt: string;
}

/** Payload passed to the UploadWidget onSuccess callback. */
export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  resource_type: string;
}
