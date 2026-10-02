"use client";

import Image from "next/image";
import { Fragment, useEffect, useReducer, useRef, type CSSProperties, type PointerEvent } from "react";
import { heroGrid, heroSlideInterval, type HeroLayer, type HeroSlide } from "@/content/home";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import styles from "./HeroSlider.module.css";

/** The incoming slide's background is revealed in this many vertical strips. */
const STRIPS = [0, 1, 2, 3, 4] as const;
/** Last strip starts at 70 + 4 × 185ms and runs for 740ms (see HeroSlider.module.css). */
const TRANSITION_MS = 70 + 4 * 185 + 740;
const SWIPE_THRESHOLD = 50;

type State = { current: number; previous: number | null; changes: number };
type Action = { type: "show"; index: number } | { type: "settle"; changes: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "show":
      if (action.index === state.current) return state;
      return { current: action.index, previous: state.current, changes: state.changes + 1 };
    case "settle":
      // Ignore a stale timer from a transition that has since been interrupted.
      return action.changes === state.changes ? { ...state, previous: null } : state;
  }
}

/** Per-breakpoint layer geometry as CSS custom properties; HeroSlider.module.css picks the active set. */
function layerStyle(layer: HeroLayer): CSSProperties {
  const vars: Record<string, string | number> = { zIndex: layer.zIndex };
  for (let level = 0; level < 4; level++) {
    const width = layer.width?.[level];
    const height = layer.height?.[level];
    vars[`--x${level}`] = layer.x[level];
    vars[`--y${level}`] = layer.y[level];
    vars[`--ay${level}`] = layer.align[level] === "middle" ? 1 : 0;
    vars[`--s${level}`] = layer.fontSize[level];
    vars[`--l${level}`] = layer.lineHeight[level];
    vars[`--fw${level}`] = layer.fontWeight[level];
    vars[`--ws${level}`] = layer.wrap[level];
    vars[`--w${level}`] = width == null ? "auto" : `calc(${width} * var(--k))`;
    vars[`--h${level}`] = height == null ? "auto" : `calc(${height} * var(--k))`;
  }
  return vars as CSSProperties;
}

const gridStyle = Object.fromEntries(
  heroGrid.widths.flatMap((width, level) => [
    [`--gw${level}`, width],
    [`--gh${level}`, heroGrid.heights[level]],
  ]),
) as CSSProperties;

export function HeroSlider({ slides }: { slides: readonly HeroSlide[] }) {
  const [state, dispatch] = useReducer(reducer, { current: 0, previous: null, changes: 0 });
  const { current, previous, changes } = state;
  const count = slides.length;
  const swipeStart = useRef<number | null>(null);

  const show = (index: number) => dispatch({ type: "show", index: (index + count) % count });

  // Autoplay: advance a fixed time after every slide change (manual or automatic).
  useEffect(() => {
    const timer = window.setTimeout(() => dispatch({ type: "show", index: (current + 1) % count }), heroSlideInterval);
    return () => window.clearTimeout(timer);
  }, [current, changes, count]);

  // Drop the outgoing slide once the curtain has fully covered it.
  useEffect(() => {
    if (previous === null) return;
    const timer = window.setTimeout(() => dispatch({ type: "settle", changes }), TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [previous, changes]);

  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") swipeStart.current = event.clientX;
  };
  const onPointerUp = (event: PointerEvent) => {
    if (swipeStart.current === null) return;
    const distance = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(distance) >= SWIPE_THRESHOLD) show(distance < 0 ? current + 1 : current - 1);
  };

  return (
    <section className={styles.hero} aria-roledescription="carousel" aria-label="Highlights">
      <div
        className={styles.module}
        style={gridStyle}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (swipeStart.current = null)}
      >
        {slides.map((slide, index) => {
          const role = index === current ? styles.current : index === previous ? styles.previous : "";
          const animate = index === current && changes > 0;
          return (
            <div
              key={slide.image.src}
              className={`${styles.slide} ${role}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              aria-hidden={index !== current}
            >
              {/* Re-keyed on every change so the curtain animation restarts. */}
              <div key={animate ? `curtain-${changes}` : "static"} className={animate ? `${styles.background} ${styles.curtain}` : styles.background}>
                {STRIPS.map((strip) => (
                  <div key={strip} className={styles.strip} style={{ "--strip": strip } as CSSProperties}>
                    <div className={styles.stripImage}>
                      <Image
                        src={slide.image.src}
                        alt={slide.image.alt}
                        fill
                        sizes="100vw"
                        preload={index === 0 && strip === 0}
                        className={styles.image}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.scrim} aria-hidden="true" />

              {slide.layers.map((layer) => (
                <div key={layer.lines.join(" ")} className={styles.layer} style={layerStyle(layer)}>
                  {layer.lines.map((line, i) => (
                    <Fragment key={line}>
                      {i > 0 && <br />}
                      {line}
                    </Fragment>
                  ))}
                </div>
              ))}
            </div>
          );
        })}

        <button type="button" className={`${styles.arrow} ${styles.arrowPrev}`} onClick={() => show(current - 1)} aria-label="Previous slide">
          <ChevronLeftIcon size={16} />
        </button>
        <button type="button" className={`${styles.arrow} ${styles.arrowNext}`} onClick={() => show(current + 1)} aria-label="Next slide">
          <ChevronRightIcon size={16} />
        </button>
      </div>
    </section>
  );
}
