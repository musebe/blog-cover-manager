import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  /** Primary right-hand CTA — defaults to "+ New Post" on the blog home. */
  action?: React.ReactNode;
}

const NAV_LINKS = [
  { href: "/", label: "Blog" },
  { href: "/about", label: "About" },
];

/** Sticky site-wide header shared across all pages. */
export function SiteHeader({ action }: SiteHeaderProps) {
  return (
    <header className="border-b bg-card sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="font-semibold tracking-tight text-sm hover:text-foreground/80 transition-colors"
          >
            The Dev Blog
          </Link>
          <nav className="hidden sm:flex items-center gap-4">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {action ?? (
          <Link href="/admin" className={cn(buttonVariants({ size: "sm" }))}>
            + New Post
          </Link>
        )}
      </div>
    </header>
  );
}
