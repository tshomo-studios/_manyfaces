import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Drives two CSS custom properties on the stage element:
 *   --mx / --my : eased pointer position, -1..1
 *   --p         : scroll progress through the stage, 0..1
 * Layers read those vars in their transforms, so the whole scene is animated
 * on the compositor without React re-renders.
 */
export function useStage<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const usePointer = !reduce && !coarse;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let tp = 0;
    let cp = 0;
    let tf = 1;
    let cf = 1;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const measure = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      tp = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      // Once the stage releases from its pinned frame it keeps scrolling
      // normally, dragging its content up past the fixed nav. Fade it out
      // over that exit so nothing lingers/collides with the nav on the way.
      const overshoot = total > 0 ? Math.max(0, -r.top - total) : 0;
      tf = 1 - Math.min(1, overshoot / (window.innerHeight * 0.5));
    };

    const loop = () => {
      measure();
      const ease = reduce ? 1 : 0.08;
      cx += (tx - cx) * ease;
      cy += (ty - cy) * ease;
      cp += (tp - cp) * (reduce ? 1 : 0.12);
      cf += (tf - cf) * (reduce ? 1 : 0.12);
      el.style.setProperty("--mx", cx.toFixed(4));
      el.style.setProperty("--my", cy.toFixed(4));
      el.style.setProperty("--p", cp.toFixed(4));
      el.style.opacity = cf.toFixed(4);
      raf = requestAnimationFrame(loop);
    };

    if (usePointer) window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return ref;
}

/** Outer element: owns the scroll range that drives --p. */
export function Stage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useStage<HTMLDivElement>();
  return (
    <div ref={ref} className={cn("relative", className)}>
      {children}
    </div>
  );
}


/** Inner element: tilts the whole scene with the pointer. */
export function World({
  children,
  className,
  intensity = 1,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  return (
    <div
      className={cn("stage-plane relative h-full w-full", className)}
      style={
        {
          "--i": intensity,
          transform:
            "rotateY(calc(var(--mx, 0) * var(--i) * 5deg)) rotateX(calc(var(--my, 0) * var(--i) * -3.5deg)) translate3d(calc(var(--mx, 0) * var(--i) * -14px), calc(var(--my, 0) * var(--i) * -10px), 0)",
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

/**
 * A single depth plane.
 *  depth  – z offset in px (negative = further away). Apparent size is
 *           compensated so depth only changes parallax, not scale.
 *  rise   – px travelled vertically across the stage's scroll progress.
 *  zoom   – extra scale added across the stage's scroll progress.
 */
export function Layer({
  children,
  className,
  depth = 0,
  rise = 0,
  zoom = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  depth?: number;
  rise?: number;
  zoom?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn("stage-plane", className)}
      style={
        {
          "--d": depth,
          "--r": rise,
          "--z": zoom,
          transform:
            "translate3d(0, calc(var(--p, 0) * var(--r) * 1px), calc(var(--d) * 1px)) scale(calc((1 - var(--d) / 1400) + var(--p, 0) * var(--z)))",
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
