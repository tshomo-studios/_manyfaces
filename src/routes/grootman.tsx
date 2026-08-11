import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Stage, World, Layer } from "@/lib/stage";
import { GROOTMAN } from "@/lib/product";
import { SiteFooter } from "@/components/SiteFooter";
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
      <Stage className="relative">
        <div className="grid gap-10 px-7 pt-28 md:grid-cols-2 md:items-start md:gap-16 md:px-20 lg:px-28">
          {/* pinned, pointer-reactive figure */}
          <div className="stage-3d sticky top-0 hidden h-screen md:block">
            <World intensity={1.4} className="flex items-center justify-center">
              <Layer
                depth={-260}
                rise={-80}
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <span className="select-none text-[16vw] font-semibold leading-none text-foreground/8">
                  001
                </span>
              </Layer>
              <Layer
                depth={30}
                rise={-40}
                className="pointer-events-none absolute inset-x-0 bottom-[14%] flex justify-center"
              >
                <div className="h-[5vh] w-[24vw] rounded-[50%] bg-black/25 blur-2xl" />
              </Layer>
              <Layer
                depth={170}
                rise={-60}
                zoom={0.12}
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <img
                  src={GROOTMAN.image}
                  alt="Grootman collectible figure"
                  className="max-h-[78vh] w-auto object-contain drop-shadow-2xl"
                />
              </Layer>
            </World>
          </div>

          {/* mobile figure */}
          <div className="flex justify-center md:hidden">
            <img
              src={GROOTMAN.image}
              alt="Grootman collectible figure"
              className="w-full max-w-md object-contain"
            />
          </div>

          {/* scrolling copy */}
          <div className="flex flex-col gap-8 pb-24 md:pt-40">
            <div>
              <h1 className="text-8xl font-semibold leading-none sm:text-[10rem] lg:text-[11rem]">
                Grootman
              </h1>
              <p className="mt-2 text-4xl font-semibold">{RAND(GROOTMAN.price)}</p>
            </div>

            <p className="max-w-md font-sans text-sm leading-5">{GROOTMAN.blurb}</p>

            <div className="flex items-center gap-3">
              <div className="flex h-10 items-center rounded-full border border-foreground px-4 text-xl font-semibold">
                <button
                  type="button"
                  className="px-2"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="px-3">{qty}</span>
                <button
                  type="button"
                  className="px-2"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={addToCart}
                className="h-10 flex-1 rounded-full bg-primary px-8 text-xl font-semibold text-primary-foreground transition-transform hover:scale-[1.03] md:flex-none md:px-20"
              >
                Add to cart
              </button>
            </div>

            <blockquote className="max-w-md pt-8 text-6xl font-semibold leading-none">
              {GROOTMAN.quote}
            </blockquote>

            <div className="pt-16">
              <h2 className="text-4xl font-semibold">Details</h2>
              <p className="max-w-md font-sans text-sm leading-5">{GROOTMAN.details}</p>
            </div>
            <div>
              <h2 className="text-4xl font-semibold">Dimensions</h2>
              <p className="font-sans text-base font-semibold">{GROOTMAN.dimensions}</p>
            </div>
            <div>
              <h2 className="text-4xl font-semibold">Material</h2>
              <p className="font-sans text-base font-semibold">{GROOTMAN.material}</p>
            </div>

            <div className="flex items-center gap-6 pt-8">
              <p className="text-6xl font-semibold">{RAND(GROOTMAN.price)}</p>
              <button
                type="button"
                onClick={addToCart}
                className="h-14 rounded-full bg-primary px-10 text-2xl font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </Stage>

      {/* detail photograph, held in its own depth plane */}
      <Stage className="h-[180vh]">
        <div className="stage-3d sticky top-0 h-screen overflow-hidden">
          <World intensity={0.9} className="flex items-center justify-center">
            <Layer
              depth={-340}
              rise={-140}
              zoom={0.16}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <img
                src={GROOTMAN.detailImage}
                alt="Close-up of the Grootman collectible figure"
                className="h-[80vh] w-auto object-contain"
                loading="lazy"
              />
            </Layer>
            <Layer depth={300} rise={-70} className="absolute inset-x-0 bottom-[12%] text-center">
              <Link
                to="/"
                className="inline-flex rounded-full bg-primary px-10 py-3 text-2xl font-semibold text-primary-foreground"
              >
                Back to the stage
              </Link>
            </Layer>
          </World>
        </div>
      </Stage>

      <SiteFooter />
    </main>
  );
}
