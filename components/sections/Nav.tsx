import Link from "next/link";

// Region navigation moved into EventList's in-list filter (All / Coastal /
// Western Sussex chips) — Nav is just the logo now, no region toggle here.
export function Nav() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center px-4 py-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-wide text-text-primary"
        >
          Sussex Nightlife
        </Link>
      </div>
    </header>
  );
}
