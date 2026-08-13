import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Region } from "@/lib/types";

export function Nav({ region }: { region?: Region }) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-wide text-text-primary"
        >
          Sussex Nightlife
        </Link>

        <nav
          aria-label="Region"
          className="flex items-center gap-1 rounded-full border border-border bg-surface p-1 text-xs"
        >
          <RegionLink
            href="/?region=coastal"
            active={region === "coastal"}
            label="Coastal"
          />
          <RegionLink
            href="/?region=western_sussex"
            active={region === "western_sussex"}
            label="Western Sussex"
          />
        </nav>
      </div>
    </header>
  );
}

function RegionLink({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-3 py-1.5 transition-colors",
        active
          ? "bg-accent text-black font-medium"
          : "text-text-muted hover:text-text-primary"
      )}
    >
      {label}
    </Link>
  );
}
