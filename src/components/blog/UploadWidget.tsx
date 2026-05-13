"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CLOUD_NAME, UPLOAD_PRESET } from "@/lib/cloudinary";
import type { CloudinaryUploadResult } from "@/types";

declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (
        options: Record<string, unknown>,
        callback: (
          error: unknown,
          result: { event: string; info: CloudinaryUploadResult }
        ) => void
      ) => { open: () => void; destroy: () => void };
    };
  }
}

interface UploadWidgetProps {
  onSuccess: (result: CloudinaryUploadResult) => void;
  /** Optional label override for the trigger button. */
  label?: string;
}

const POLL_MS = 100;
const TIMEOUT_MS = 10_000;

/**
 * Cloudinary Upload Widget wrapper.
 * Polls for `createUploadWidget` availability before initialising to avoid
 * race conditions with the async script in the root layout.
 */
export function UploadWidget({
  onSuccess,
  label = "Upload Cover Image",
}: UploadWidgetProps) {
  const widgetRef = useRef<ReturnType<
    NonNullable<Window["cloudinary"]>["createUploadWidget"]
  > | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!CLOUD_NAME) {
      setError("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set.");
      return;
    }

    const interval = setInterval(() => {
      if (typeof window.cloudinary?.createUploadWidget === "function") {
        clearInterval(interval);
        clearTimeout(timeout);

        widgetRef.current = window.cloudinary.createUploadWidget(
          {
            cloudName: CLOUD_NAME,
            uploadPreset: UPLOAD_PRESET,
            sources: ["local", "camera", "url"],
            multiple: false,
            cropping: false,
            resourceType: "image",
          },
          (err, result) => {
            if (err) return;
            if (result.event === "success") onSuccess(result.info);
          }
        );

        setReady(true);
      }
    }, POLL_MS);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setError("Upload widget failed to load. Check your network.");
    }, TIMEOUT_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      widgetRef.current?.destroy();
    };
    // onSuccess is intentionally excluded — widget is created once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <p className="text-sm text-destructive" role="alert">
        {error}
      </p>
    );
  }

  return (
    <Button
      type="button"
      disabled={!ready}
      onClick={() => widgetRef.current?.open()}
      className="w-full sm:w-auto"
    >
      {ready ? label : "Loading widget…"}
    </Button>
  );
}
