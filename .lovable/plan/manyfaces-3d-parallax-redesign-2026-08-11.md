# manyfaces — 3D parallax redesign

Rebuild the current two-page site (home + Grootman product page) as one continuous, depth-driven experience where the existing Grootman render is the hero object floating in a 3D scene that reacts to scroll and mouse movement.

## What exists today

The live site is very light: a home page with the Grootman render beside a huge condensed wordmark and a "Get to know" pill, and a product page with Details / Dimensions / Material blocks, size pills, add-to-cart and a cart drawer. Two images total — the Grootman render and one photo (IMG_4227). No 3D model files, so the depth is built from those flat assets, typography and CSS transforms, per your "existing assets only" choice.

## The experience

**Home (`/`)**
- Full-viewport 3D stage. The Grootman render sits on its own transform plane; the wordmark, a large ghosted background "manyfaces" type layer, and a soft floor shadow sit on planes at different Z depths.
- Scroll drives the camera: layers translate, scale and rotate at different rates so Grootman appears to advance toward the viewer while type slides past him.
- Mouse position tilts the whole stage (subtle rotateX/rotateY with easing), so moving the cursor feels like walking around the figure.
- Scroll acts continue down the page: the wordmark breaks apart, Grootman settles into a smaller "portrait" pose, and detail callouts (name, edition, material) fade in on their own planes.
- Final section is the "Get to know" invitation leading to the product page.

**Product page (`/grootman`)**
- Same 3D stage carried over: the render stays pinned and pointer-reactive on the left while the right column scrolls through Details, Dimensions, Material.
- Size pills, price, quantity and Add to cart preserved; cart is a slide-over drawer with local state (no backend).
- The second photo is used as a supporting in-scene layer rather than a separate gallery grid.

**Look**
- Keep the current identity: near-white to grey vertical gradient, pure black type, ultra-condensed heavy display face for headlines with a clean sans for body copy, fully round pill buttons.
- Motion is weighty and damped, never bouncy — the figure should feel like a heavy object.

## Technical notes

- TanStack Start routes: rewrite `src/routes/index.tsx`, add `src/routes/grootman.tsx`, each with its own head() metadata (title, description, og/twitter).
- The two images are pulled from the current site and stored as Lovable Assets (CDN pointers), not committed binaries.
- Depth via CSS 3D: a `perspective` stage with `transform-style: preserve-3d` and per-layer `translate3d/scale/rotate`, driven by a shared scroll + pointer hook using `requestAnimationFrame` and lerped values (no layout thrash). Motion for React handles enter transitions.
- Respect `prefers-reduced-motion`: layers render in place, no pointer tilt. Pointer tilt disabled on touch; mobile falls back to scroll parallax only.
- Cart state in React context + localStorage; no backend.
- Display/body fonts loaded via a `<link>` in `__root.tsx`; all colors as semantic tokens in `src/styles.css`.
