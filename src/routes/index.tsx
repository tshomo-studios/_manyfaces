import { createFileRoute, Link } from "@tanstack/react-router";
import { GROOTMAN } from "@/lib/product";
import { SiteFooter } from "@/components/SiteFooter";
import { useCart, RAND } from "@/lib/cart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "manyfaces — Grootman, a collectible in three dimensions" },
      {
        name: "description",
        content:
          "manyfaces presents Grootman: a hand-finished collectible figure of the Johannesburg taxi driver, shown in a scrolling three-dimensional stage.",
      },
      { property: "og:title", content: "manyfaces — Grootman" },
      {
        property: "og:description",
        content:
          "A hand-finished collectible figure of the Johannesburg taxi driver. Get to know Grootman.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const SPECS = [
  { label: "Edition", value: "001 / Johannesburg" },
  { label: "Dimensions", value: "250 × 180 × 180 mm" },
  { label: "Material", value: "Hand-finished resin" },
  { label: "Shipping", value: "Included in SA" },
];

const pill =
  "inline-flex h-14 items-center rounded-full px-9 text-[30px] font-semibold leading-none transition-transform hover:scale-[1.03]";

function Index() {
  const { add } = useCart();

  return (
    <main>
      {/* ---------- Hero: catalogue plate ---------- */}
      <section
        id="figure"
        className="mx-auto max-w-[1440px] scroll-mt-4 px-4 pt-6 sm:px-8 md:pt-10 lg:px-14 lg:pt-14"
      >
        <div className="flex flex-wrap items-stretch gap-6 md:gap-10">
          <div className="flex min-w-0 flex-[1_1_420px] flex-col justify-between gap-10 pt-2">
            <div className="eyebrow flex justify-between text-muted-foreground">
              <span>Plate 001</span>
              <span>Johannesburg</span>
            </div>
            <h1 className="text-[clamp(120px,16vw,248px)] font-extrabold uppercase leading-[0.78] tracking-[-0.01em]">
              Groot&#8203;man
            </h1>
            <p className="max-w-[440px] font-sans text-lg leading-normal text-ink-soft">
              A hand-finished collectible figure of the Johannesburg taxi driver — a portrait of our
              fathers, uncles and grand timers.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/grootman" className={`${pill} bg-primary text-primary-foreground`}>
                Get to know him
              </Link>
              <span className="pl-2 text-[34px] font-semibold leading-none">
                {RAND(GROOTMAN.price)}
              </span>
            </div>
          </div>

          <figure className="relative flex min-h-[520px] min-w-0 flex-[1_1_520px] items-end justify-center overflow-hidden rounded-[4px] bg-panel md:min-h-[640px]">
            <span
              aria-hidden="true"
              className="absolute left-7 top-6 text-[200px] font-extrabold leading-[0.8] text-black/[0.07]"
            >
              001
            </span>
            <img
              src={GROOTMAN.image}
              alt="Grootman collectible figure, seated"
              className="relative mb-14 h-[440px] max-w-full object-contain md:h-[560px]"
            />
            <figcaption className="eyebrow absolute inset-x-0 bottom-0 flex justify-between gap-3 border-t border-border bg-panel px-5 py-3.5 text-ink-soft">
              <span>Ed. 001 — Grootman</span>
              <span>250 × 180 × 180 mm</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------- Spec strip ---------- */}
      <section
        id="specs"
        aria-label="Specifications"
        className="mx-auto max-w-[1440px] scroll-mt-4 px-4 pt-8 sm:px-8 md:pt-14 lg:px-14"
      >
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] border-y border-b-border border-t-foreground">
          {SPECS.map((spec) => (
            <div
              key={spec.label}
              className="border-border py-5 pr-5 sm:[&:not(:last-child)]:border-r sm:[&:not(:first-child)]:pl-5"
            >
              <dt className="eyebrow text-muted-foreground">{spec.label}</dt>
              <dd className="mt-2 text-4xl font-semibold leading-none">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- Story ---------- */}
      <section
        id="story"
        className="mx-auto max-w-[1440px] scroll-mt-4 px-4 py-20 sm:px-8 md:py-32 lg:px-14"
      >
        <div className="flex flex-wrap items-start gap-8 md:gap-20">
          <div className="eyebrow flex-[0_1_200px] pt-3.5 text-muted-foreground">
            02 — The story
          </div>
          <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-12">
            <blockquote className="text-[clamp(64px,8vw,128px)] font-extrabold leading-[0.86]">
              {GROOTMAN.quote}
            </blockquote>
            <div className="grid max-w-[880px] gap-8 font-sans text-lg leading-relaxed text-ink-soft sm:grid-cols-2">
              <p>{GROOTMAN.blurb}</p>
              <p>
                We see him sitting on the front porch of that well-respected house around the block,
                or in front of the fleet of taxis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Up close ---------- */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-8 px-4 py-12 sm:px-8 md:gap-20 md:py-24 lg:px-14">
          <div className="flex h-[520px] min-w-0 flex-[1_1_420px] items-center justify-center overflow-hidden rounded-[4px] bg-[oklch(0.22_0_0)] md:h-[720px]">
            <img
              src={GROOTMAN.detailImage}
              alt="Close-up of the Grootman figure"
              className="h-full max-w-full object-contain"
              loading="lazy"
            />
          </div>
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-7">
            <span className="eyebrow text-white/70">03 — Up close</span>
            <h2 className="text-[clamp(80px,9vw,152px)] font-extrabold leading-[0.82]">
              Meet him up close
            </h2>
            <p className="max-w-[420px] font-sans text-lg leading-relaxed text-white/80">
              Every figure is finished by hand, so no two Grootmen carry quite the same face.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/grootman" className={`${pill} bg-background text-foreground`}>
                Get to know
              </Link>
              <button
                type="button"
                onClick={() =>
                  add(
                    {
                      handle: GROOTMAN.handle,
                      title: GROOTMAN.title,
                      price: GROOTMAN.price,
                      image: GROOTMAN.image,
                    },
                    1,
                  )
                }
                className={`${pill} border border-white/80 text-primary-foreground`}
              >
                Add to cart — {RAND(GROOTMAN.price)}
              </button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
