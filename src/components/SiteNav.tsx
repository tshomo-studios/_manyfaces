import { Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/Wordmark";
import { useCart } from "@/lib/cart";

export function SiteNav() {
  const { count, setOpen } = useCart();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-7 py-6 mix-blend-multiply md:px-20 lg:px-28">
      <Link to="/" aria-label="manyfaces home" className="block w-[130px] md:w-[150px]">
        <Wordmark className="h-auto w-full fill-foreground text-foreground" />
      </Link>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open cart"
        className="relative grid size-11 place-items-center"
      >
        <svg viewBox="0 0 27 34" className="w-6 fill-foreground" aria-hidden="true">
          <path d="M3.33 33.33c-.92 0-1.7-.33-2.35-.98A3.2 3.2 0 0 1 0 30V10c0-.92.33-1.7.98-2.35A3.2 3.2 0 0 1 3.33 6.67h3.34C6.67 4.83 7.32 3.26 8.63 1.96A6.4 6.4 0 0 1 13.33 0c1.84 0 3.4.65 4.71 1.96a6.4 6.4 0 0 1 1.96 4.71h3.33c.92 0 1.7.33 2.35.98.66.65.99 1.43.99 2.35v20c0 .92-.33 1.7-.99 2.35-.65.65-1.43.98-2.35.98H3.33Zm0-3.33h20V10H20v3.33c0 .47-.16.87-.48 1.19-.32.32-.72.48-1.19.48s-.86-.16-1.18-.48a1.6 1.6 0 0 1-.48-1.19V10H10v3.33c0 .47-.16.87-.48 1.19-.32.32-.71.48-1.19.48-.47 0-.87-.16-1.19-.48a1.6 1.6 0 0 1-.47-1.19V10H3.33v20ZM10 6.67h6.67c0-.92-.33-1.71-.98-2.36a3.2 3.2 0 0 0-2.36-.98c-.91 0-1.7.33-2.35.98-.65.65-.98 1.44-.98 2.36Z" />
        </svg>
        <span className="absolute -right-1 top-0 grid size-5 place-items-center rounded-full bg-primary font-sans text-[11px] font-bold text-primary-foreground">
          {count}
        </span>
      </button>
    </nav>
  );
}
