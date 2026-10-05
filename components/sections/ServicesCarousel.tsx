"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useLayoutEffect, useRef } from "react";
import type { ServiceRow } from "@/content/home";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import styles from "./ServicesCarousel.module.css";

/**
 * The card list is rendered three times — [clone][main][clone] — so there is
 * always content on both sides of the view, and the loop can wrap invisibly by
 * jumping exactly one copy's width (the copies are identical).
 */
const COPIES = 3;
const MAIN_COPY = 1;
const AUTOPLAY_MS = 4500;
/** How long autoplay holds off after the visitor steps or swipes. */
const HOLD_AFTER_INTERACTION_MS = 9000;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Card geometry, in the track's scroll coordinates. */
function measure(track: HTMLElement, count: number) {
  const cards = track.querySelectorAll<HTMLElement>("[data-card]");
  return {
    step: cards[1].offsetLeft - cards[0].offsetLeft,
    copyWidth: cards[count].offsetLeft - cards[0].offsetLeft,
    mainStart: cards[count * MAIN_COPY].offsetLeft,
  };
}

/** Infinite, auto-advancing carousel of service summaries; each card links to its full write-up on /services. */
export function ServicesCarousel({ services }: { services: readonly ServiceRow[] }) {
  const count = services.length;
  const baseId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  /** A `.container` element: its left edge is where the cards line up. */
  const alignRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pause = useRef({ hover: false, focus: false, visible: false, until: 0 });

  /** Keeps the view centred on the main copy, wrapping by one copy width when it drifts into a clone. */
  const recentre = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { copyWidth, mainStart } = measure(track, count);
    const centre = track.scrollLeft + track.clientWidth / 2;
    if (centre < mainStart) track.scrollLeft += copyWidth;
    else if (centre >= mainStart + copyWidth) track.scrollLeft -= copyWidth;
  }, [count]);

  const step = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      recentre();
      track.scrollBy({ left: direction * measure(track, count).step, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    },
    [count, recentre],
  );

  const holdAutoplay = () => {
    pause.current.until = Date.now() + HOLD_AFTER_INTERACTION_MS;
  };

  // Start with the first card of the main copy lined up with the page container.
  useLayoutEffect(() => {
    const track = trackRef.current;
    const align = alignRef.current;
    if (!track || !align) return;
    const gutter = align.getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollLeft = measure(track, count).mainStart - gutter;
  }, [count]);

  // Once scrolling settles (or the window resizes), wrap back into the main copy if needed.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let timer = 0;
    const settle = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(recentre, 150);
    };
    track.addEventListener("scroll", settle, { passive: true });
    window.addEventListener("resize", settle);
    return () => {
      window.clearTimeout(timer);
      track.removeEventListener("scroll", settle);
      window.removeEventListener("resize", settle);
    };
  }, [recentre]);

  // Autoplay: one card every few seconds, only while the carousel is on screen and idle.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const timer = window.setInterval(() => {
      const p = pause.current;
      if (p.hover || p.focus || !p.visible || document.hidden || Date.now() < p.until) return;
      step(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [step]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        pause.current.visible = entry.isIntersecting;
      },
      { threshold: 0.3 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const trackId = `${baseId}-track`;
  const headingId = `${baseId}-heading`;

  const cards = Array.from({ length: COPIES }, (_, copy) => copy).flatMap((copy) =>
    services.map((service) => {
      const isMain = copy === MAIN_COPY;
      return (
        <article
          key={`${copy}-${service.id}`}
          data-card=""
          className={styles.card}
          // The clones are visual only: screen readers and the Tab key see one set of cards.
          aria-hidden={isMain ? undefined : true}
        >
          <div className={styles.media}>
            <Image src={service.image.src} alt="" fill sizes="(max-width: 767px) 80vw, 440px" className={styles.image} />
          </div>
          <div className={styles.body}>
            <h3 className={styles.title}>{service.heading}</h3>
            <p className={styles.teaser}>{service.teaser}</p>
            <Link href={`/services#${service.id}`} className={styles.more} tabIndex={isMain ? undefined : -1}>
              View {service.shortName} details
              <ArrowRightIcon size={18} />
            </Link>
          </div>
        </article>
      );
    }),
  );

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby={headingId}
      onMouseEnter={() => {
        pause.current.hover = true;
      }}
      onMouseLeave={() => {
        pause.current.hover = false;
      }}
      onFocus={() => {
        pause.current.focus = true;
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) pause.current.focus = false;
      }}
    >
      <div ref={alignRef} className={`container ${styles.header}`}>
        <span className="chip">Our Services</span>
        <h2 id={headingId} className={styles.heading}>
          All IT Solutions Under One Roof
        </h2>
        <p className={styles.subtitle}>From Cyber Security to Development</p>
      </div>

      <div className={styles.viewport}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.prev}`}
          aria-label="Previous service"
          aria-controls={trackId}
          onClick={() => {
            holdAutoplay();
            step(-1);
          }}
        >
          <ChevronLeftIcon size={22} />
        </button>

        <div id={trackId} ref={trackRef} className={styles.track} onPointerDown={holdAutoplay}>
          {cards}
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.next}`}
          aria-label="Next service"
          aria-controls={trackId}
          onClick={() => {
            holdAutoplay();
            step(1);
          }}
        >
          <ChevronRightIcon size={22} />
        </button>
      </div>

      <div className={`container ${styles.footer}`}>
        <Link href="/services" className="button">
          View all services
          <ArrowRightIcon size={18} />
        </Link>
      </div>
    </section>
  );
}
