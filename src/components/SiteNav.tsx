import { Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/Wordmark";
import { useCart } from "@/lib/cart";

const NAV = [
  { label: "The figure", hash: "figure" },
  { label: "Story", hash: "story" },
  { label: "Specs", hash: "specs" },
];

export function SiteNav() {
  const { count, setOpen } = useCart();

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-8 lg:px-14">
        <Link to="/" aria-label="manyfaces home" className="block w-[120px] md:w-[140px]">
          <Wordmark className="h-auto w-full" />
        </Link>
        <nav
          aria-label="Primary"
          className="eyebrow order-3 flex w-full gap-7 sm:order-none sm:w-auto"
        >
          {NAV.map((item) => (
            <Link
              key={item.hash}
              to="/"
              hash={item.hash}
              className="text-foreground transition-colors hover:text-muted-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/grootman"
            className="text-foreground transition-colors hover:text-muted-foreground"
          >
            Shop
          </Link>
        </nav>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
          className="eyebrow inline-flex h-11 items-center gap-2.5 rounded-full border border-foreground px-[18px] text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          <svg
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="M2 5h12l-1 12H3L2 5z" />
            <path d="M5 5V4a3 3 0 0 1 6 0v1" />
          </svg>
          Cart ({count})
        </button>
      </div>
    </header>
  );
}
