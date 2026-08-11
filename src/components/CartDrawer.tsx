import { useCart, RAND } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { lines, open, setOpen, remove, subtotal } = useCart();

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-60 bg-black/60 transition-opacity duration-500",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        aria-hidden={!open}
        className={cn(
          "fixed inset-x-0 bottom-0 z-70 flex max-h-[92svh] flex-col overflow-y-auto bg-primary px-7 py-7 text-primary-foreground transition-transform duration-500 md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[430px] md:px-8 md:py-8",
          open ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-x-full md:translate-y-0",
        )}
      >
        <div className="flex items-start justify-between gap-6">
          <h2 className="text-7xl font-semibold leading-none md:text-8xl">Checkout</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="text-5xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="mt-12 grid gap-6">
          {lines.map((line) => (
            <div key={line.handle} className="flex items-center gap-4">
              <img
                src={line.image}
                alt=""
                className="size-16 shrink-0 object-contain"
                loading="lazy"
              />
              <div className="flex-1">
                <p className="text-3xl font-semibold leading-none">{line.title}</p>
                <p className="font-sans text-xs text-primary-foreground/70">
                  {line.qty} &times; {RAND(line.price)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => remove(line.handle)}
                className="font-sans text-xs underline underline-offset-4"
              >
                remove
              </button>
            </div>
          ))}
          {lines.length === 0 && (
            <p className="font-sans text-sm text-primary-foreground/70">Your cart is empty.</p>
          )}
        </div>

        <div className="mt-12 border-t border-dashed border-primary-foreground/80 pt-16">
          <div className="flex items-start justify-between gap-8">
            <div>
              <p className="text-4xl font-semibold">Subtotal</p>
              <p className="mt-4 font-sans text-sm">Shipping</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-semibold">{RAND(subtotal)}</p>
              <p className="mt-4 max-w-40 font-sans text-sm leading-5">
                Included in price when located South Africa
              </p>
            </div>
          </div>
          <button
            type="button"
            disabled={lines.length === 0}
            className="mt-14 h-15 w-full rounded-full bg-background py-4 text-4xl font-semibold text-foreground disabled:opacity-40"
          >
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
