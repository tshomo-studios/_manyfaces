import { useCart, RAND } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { lines, open, setOpen, remove, setQty, subtotal, count } = useCart();

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
        aria-label="Cart"
        className={cn(
          "fixed inset-x-0 bottom-0 z-70 flex max-h-[92svh] flex-col overflow-y-auto bg-primary text-primary-foreground transition-transform duration-500 md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[430px]",
          open
            ? "translate-y-0 md:translate-x-0"
            : "translate-y-full md:translate-x-full md:translate-y-0",
        )}
      >
        <div className="flex items-center justify-between border-b border-white/20 px-6 py-5">
          <span className="eyebrow text-white/70">
            Your cart · {count} {count === 1 ? "item" : "items"}
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="grid size-11 place-items-center rounded-full border border-white/40"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>

        <h2 className="px-6 pt-7 text-[104px] font-extrabold leading-[0.8]">Checkout</h2>

        <div className="flex flex-1 flex-col gap-4 px-6 py-8">
          {lines.map((line) => (
            <div key={line.handle} className="flex flex-col gap-3 border-b border-white/20 pb-5">
              <div className="flex gap-4">
                <div className="grid h-32 w-26 shrink-0 place-items-center overflow-hidden rounded-[4px] bg-panel">
                  <img src={line.image} alt="" className="h-[92%] object-contain" loading="lazy" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <p className="text-4xl font-semibold leading-[0.9]">{line.title}</p>
                    <p className="eyebrow mt-1.5 text-white/70">Ed. 001 · 250 × 180 × 180 mm</p>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex h-11 items-center rounded-full border border-white/40">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQty(line.handle, line.qty - 1)}
                        className="h-full w-10 text-xl"
                      >
                        −
                      </button>
                      <span
                        aria-live="polite"
                        className="min-w-5 text-center text-[22px] font-semibold"
                      >
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQty(line.handle, line.qty + 1)}
                        className="h-full w-10 text-xl"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-[28px] font-semibold">{RAND(line.qty * line.price)}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => remove(line.handle)}
                className="eyebrow min-h-11 self-start text-white/80 underline underline-offset-4"
              >
                Remove
              </button>
            </div>
          ))}
          {lines.length === 0 && (
            <p className="font-sans text-sm text-white/70">Your cart is empty.</p>
          )}
        </div>

        <div className="flex flex-col gap-3.5 border-t border-dashed border-white/50 p-6">
          <div className="flex items-baseline justify-between">
            <span className="eyebrow text-white/70">Subtotal</span>
            <span className="text-[44px] font-semibold leading-none">{RAND(subtotal)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="eyebrow text-white/70">Shipping</span>
            <span className="max-w-50 text-right font-sans text-sm leading-snug text-white/80">
              Included when located in South Africa
            </span>
          </div>
          <button
            type="button"
            disabled={lines.length === 0}
            className="mt-3 h-16 rounded-full bg-background text-4xl font-semibold text-foreground disabled:opacity-40"
          >
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
