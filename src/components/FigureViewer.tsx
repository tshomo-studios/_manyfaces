import { useRef, useState, type PointerEvent } from "react";

const MIN = -180;
const MAX = 180;
const clamp = (n: number) => Math.max(MIN, Math.min(MAX, n));

/**
 * Drag/slider rotatable view of a single product photo.
 * Placeholder until a real 3D model (.glb) or turntable photo set is available.
 */
export function FigureViewer({ src, alt }: { src: string; alt: string }) {
  const [angle, setAngle] = useState(-18);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ x: 0, angle: 0 });

  const facing = Math.abs(Math.cos((angle * Math.PI) / 180));

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, angle };
    setDragging(true);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setAngle(clamp(drag.current.angle + (e.clientX - drag.current.x) * 0.5));
  };
  const endDrag = () => setDragging(false);

  return (
    <div className="flex flex-col overflow-hidden rounded-[4px] bg-panel">
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`relative flex h-[480px] touch-none select-none items-end justify-center [perspective:1400px] md:h-[680px] ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <span aria-hidden="true" className="eyebrow absolute left-6 top-5 text-muted-foreground">
          360° view
        </span>
        <span aria-hidden="true" className="eyebrow absolute right-6 top-5 text-muted-foreground">
          {angle > 0 ? "+" : ""}
          {Math.round(angle)}°
        </span>
        <div
          aria-hidden="true"
          className="absolute bottom-11 left-1/2 h-12 w-[360px] -ml-[180px] rounded-[50%] bg-black/20 blur-[18px]"
          style={{ transform: `scaleX(${0.55 + 0.45 * facing})` }}
        />
        <div
          className="flex h-[90%] items-end justify-center [transform-style:preserve-3d]"
          style={{
            transform: `rotateY(${angle}deg) rotateX(2deg)`,
            transition: dragging ? "none" : "transform 0.5s cubic-bezier(.2,.7,.2,1)",
          }}
        >
          <img
            src={src}
            alt={alt}
            draggable={false}
            className="pointer-events-none h-full max-w-full object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.25)]"
            style={{ filter: `brightness(${0.8 + 0.2 * facing})` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-border px-4 py-3">
        <button
          type="button"
          aria-label="Rotate left"
          onClick={() => setAngle((a) => clamp(a - 30))}
          className="grid size-11 place-items-center rounded-full border border-foreground"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="M10 3L5 8l5 5" />
          </svg>
        </button>
        <label className="eyebrow flex min-w-[200px] flex-1 items-center gap-3 text-muted-foreground">
          <span>Rotate</span>
          <input
            type="range"
            min={MIN}
            max={MAX}
            step={1}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="h-11 flex-1 accent-foreground"
          />
        </label>
        <button
          type="button"
          aria-label="Rotate right"
          onClick={() => setAngle((a) => clamp(a + 30))}
          className="grid size-11 place-items-center rounded-full border border-foreground"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="M6 3l5 5-5 5" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setAngle(0)}
          className="eyebrow h-11 rounded-full bg-foreground px-[18px] text-background"
        >
          Front
        </button>
      </div>
    </div>
  );
}
