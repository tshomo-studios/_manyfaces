import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { GROOTMAN } from "@/lib/product";
import { SiteFooter } from "@/components/SiteFooter";
import { FigureViewer } from "@/components/FigureViewer";
import { useCart, RAND } from "@/lib/cart";

export const Route = createFileRoute("/grootman")({
  head: () => ({
    meta: [
      { title: "Grootman — manyfaces collectible figure" },
      {
        name: "description",
        content:
          "Grootman: 250 x 180 x 180mm hand-finished collectible figure from manyfaces. R 899, shipping included in South Africa.",
      },
      { property: "og:title", content: "Grootman — manyfaces" },
      {
        property: "og:description",
        content:
          "A representation of our fathers, uncles and grand timers. Hand-finished collectible figure, 250 x 180 x 180mm.",
      },
      { property: "og:type", content: "product" },
      { property: "og:url", content: "/grootman" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/grootman" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Grootman",
          description: GROOTMAN.details,
          brand: { "@type": "Brand", name: "manyfaces" },
          offers: {
            "@type": "Offer",
            price: GROOTMAN.price,
            priceCurrency: "ZAR",
            availability: "https://schema.org/InStock",
          },
        }),
      },
    ],
  }),
  component: GrootmanPage,
});

const SPEC_ROWS = [
  { label: "Details", value: GROOTMAN.details, display: false },
  { label: "Dimensions", value: "250 × 180 × 180 mm", display: true },
  { label: "Material", value: GROOTMAN.material, display: true },
  {
    label: "Shipping",
    value: "Included in the price when located in South Africa.",
    display: false,
  },
];

function GrootmanPage() {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  const addToCart = () =>
    add(
      {
        handle: GROOTMAN.handle,
        title: GROOTMAN.title,
        price: GROOTMAN.price,
        image: GROOTMAN.image,
      },
      qty,
    );

  return (
    <main>
      <nav
        aria-label="Breadcrumb"
        className="eyebrow mx-auto max-w-[1440px] px-4 pt-6 text-muted-foreground sm:px-8 lg:px-14"
      >
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>{" "}
        /{" "}
        <span aria-current="page" className="text-foreground">
          Grootman
        </span>
      </nav>

      <section className="mx-auto max-w-[1440px] px-4 pt-6 sm:px-8 lg:px-14">
        <div className="flex flex-wrap items-start gap-6 md:gap-16">
          {/* gallery */}
          <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-4">
            <FigureViewer src={GROOTMAN.image} alt="Grootman collectible figure, rotatable view" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex h-[420px] items-center justify-center overflow-hidden rounded-[4px] bg-panel md:h-[520px]">
                <img
                  src={GROOTMAN.detailImage}
                  alt="Close-up of the Grootman figure"
                  className="h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="flex h-[420px] flex-col justify-between rounded-[4px] bg-primary p-8 text-primary-foreground md:h-[520px]">
                <span className="eyebrow text-white/70">From the studio</span>
                <blockquote className="text-[clamp(48px,4.4vw,72px)] font-extrabold leading-[0.88]">
                  {GROOTMAN.quote}
                </blockquote>
              </div>
            </div>
          </div>

          {/* buy column */}
          <aside
            aria-label="Purchase"
            className="flex min-w-0 max-w-[520px] flex-[1_1_380px] flex-col gap-7 pt-2 md:sticky md:top-6"
          >
            <div>
              <p className="eyebrow mb-2 text-muted-foreground">Edition 001 · Johannesburg</p>
              <h1 className="text-[clamp(96px,9vw,152px)] font-extrabold uppercase leading-[0.8]">
                Grootman
              </h1>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-foreground pt-4">
              <span className="text-5xl font-semibold leading-none">{RAND(GROOTMAN.price)}</span>
              <span className="eyebrow text-muted-foreground">Shipping incl. in SA</span>
            </div>
            <p className="font-sans text-[17px] leading-relaxed text-ink-soft">{GROOTMAN.blurb}</p>

            <div className="flex flex-wrap gap-3">
              <div className="inline-flex h-14 items-center rounded-full border border-foreground">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-full w-13 text-[28px] font-semibold"
                >
                  −
                </button>
                <span aria-live="polite" className="min-w-7 text-center text-[28px] font-semibold">
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                  className="h-full w-13 text-[28px] font-semibold"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={addToCart}
                className="h-14 flex-[1_1_200px] rounded-full bg-primary px-8 text-[30px] font-semibold leading-none text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Add to cart — {RAND(GROOTMAN.price * qty)}
              </button>
            </div>

            <dl className="border-t border-border">
              {SPEC_ROWS.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-wrap gap-x-6 gap-y-2 border-b border-border py-[18px]"
                >
                  <dt className="eyebrow flex-[0_0_120px] pt-1 text-muted-foreground">
                    {row.label}
                  </dt>
                  <dd
                    className={
                      row.display
                        ? "flex-[1_1_220px] text-[28px] font-semibold leading-none"
                        : "flex-[1_1_220px] font-sans text-base leading-relaxed"
                    }
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8 md:py-28 lg:px-14">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-foreground pt-6">
          <p className="max-w-[760px] text-[clamp(56px,6vw,96px)] font-extrabold leading-[0.86]">
            One figure. Many faces to come.
          </p>
          <Link
            to="/"
            className="inline-flex h-14 items-center rounded-full border border-foreground px-9 text-[30px] font-semibold leading-none"
          >
            Back to home
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
