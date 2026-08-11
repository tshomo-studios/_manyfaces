import { createFileRoute, Link } from "@tanstack/react-router";
import { Stage, World, Layer } from "@/lib/stage";
import { GROOTMAN } from "@/lib/product";
import { SiteFooter } from "@/components/SiteFooter";

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

function Index() {
  return (
    <main>
      {/* ---------- Act one: the figure arrives ---------- */}
      <Stage className="h-[420vh]">
        <div className="stage-3d sticky top-0 h-screen overflow-hidden">
          <World className="flex items-center justify-center">
            {/* ghost wordmark, deepest plane */}
            <Layer
              depth={-620}
              rise={-140}
              className="pointer-events-none absolute inset-x-0 top-[18%] text-center"
            >
              <span className="select-none text-[26vw] font-semibold leading-none text-foreground/8">
                manyfaces
              </span>
            </Layer>

            {/* name type, mid plane */}
            <Layer
              depth={-220}
              rise={-320}
              zoom={0.18}
              className="pointer-events-none absolute inset-x-0 top-[15%] text-center"
            >
              <h1 className="select-none text-[20vw] font-semibold leading-[0.8] tracking-tight md:text-[15vw]">
                Grootman
              </h1>
            </Layer>

            {/* floor shadow */}
            <Layer
              depth={40}
              rise={-90}
              zoom={0.3}
              className="pointer-events-none absolute inset-x-0 bottom-[6%] flex justify-center"
            >
              <div className="h-[6vh] w-[46vw] rounded-[50%] bg-black/25 blur-2xl" />
            </Layer>

            {/* the figure */}
            <Layer
              depth={160}
              rise={-70}
              zoom={0.34}
              className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
            >
              <img
                src={GROOTMAN.image}
                alt="Grootman collectible figure, seated"
                className="h-[70vh] w-auto object-contain drop-shadow-2xl"
              />
            </Layer>

            {/* foreground annotations */}
            <Layer
              depth={240}
              rise={-40}
              className="pointer-events-none absolute inset-x-0 bottom-[8%] flex justify-between px-7 font-sans text-[11px] uppercase tracking-[0.3em] md:px-20 lg:px-28"
            >
              <span>ed. 001 / Johannesburg</span>
              <span>250 &times; 180 &times; 180 mm</span>
            </Layer>

            <Layer
              depth={260}
              rise={-30}
              className="absolute inset-x-0 bottom-[18%] flex justify-center"
            >

              <Link
                to="/grootman"
                className="pointer-events-auto inline-flex rounded-full bg-primary px-10 py-3 text-3xl font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                Get to know
              </Link>
            </Layer>

          </World>
        </div>
      </Stage>

      {/* ---------- Act two: the quote, floating forward ---------- */}
      <Stage className="h-[220vh]">
        <div className="stage-3d sticky top-0 flex h-screen items-center overflow-hidden">
          <World intensity={1.6}>
            <Layer
              depth={-380}
              rise={-100}
              className="absolute inset-x-0 top-1/2 -translate-y-[60%] px-7 md:px-20 lg:px-28"
            >
              <p className="max-w-4xl text-[9vw] font-semibold leading-[0.85] md:text-[6vw]">
                {GROOTMAN.quote}
              </p>
            </Layer>
            <Layer
              depth={220}
              rise={-160}
              className="absolute bottom-[18%] right-7 max-w-sm text-right md:right-20 lg:right-28"
            >
              <p className="font-sans text-sm leading-6 text-foreground/80">{GROOTMAN.blurb}</p>
            </Layer>

          </World>
        </div>
      </Stage>

      {/* ---------- Act three: the invitation ---------- */}
      <Stage className="h-[200vh]">
        <div className="stage-3d sticky top-0 h-screen overflow-hidden">
          <World intensity={0.7} className="flex items-center justify-center">
            <Layer
              depth={-300}
              rise={-120}
              zoom={0.2}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <img
                src={GROOTMAN.detailImage}
                alt="Close-up of the Grootman figure"
                className="h-[70vh] w-auto object-contain opacity-90"
                loading="lazy"
              />
            </Layer>
            <Layer depth={340} rise={-60} className="absolute inset-x-0 top-[12%] text-center">
              <p className="font-sans text-[11px] uppercase tracking-[0.4em]">manyfaces &trade;</p>
              <h2 className="mt-4 text-[13vw] font-semibold leading-none md:text-[9vw]">
                Meet him up close
              </h2>
              <Link
                to="/grootman"
                className="mt-8 inline-flex rounded-full bg-primary px-12 py-4 text-3xl font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                Get to know
              </Link>
            </Layer>
          </World>
        </div>
      </Stage>

      <SiteFooter />
    </main>
  );
}
