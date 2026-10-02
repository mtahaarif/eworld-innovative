"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { ServiceRow } from "@/content/home";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/ui/icons";
import styles from "./ServicesCarousel.module.css";

/**
 * The card list is rendered three times — [clone][main][clone] — so there is
 * always content on both sides of the view, and the loop can wrap invisibly by
 * jumping exactly one copy's width (the copies are identical).
 */
const COPIES = 3;
const MAIN_COPY = 1;
const AUTOPLAY_MS = 4500;
/** How long autoplay holds off after the visitor steps, swipes or jumps to a card. */
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

export function ServicesCarousel({ services }: { services: readonly ServiceRow[] }) {
  const count = services.length;
  const baseId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  /** A `.container` element: its left edge is where the cards line up. */
  const alignRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pause = useRef({ hover: false, focus: false, dialog: false, visible: false, until: 0 });

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  /** Which service the dialog shows; kept after closing so the content doesn't blank mid-close. */
  const [shownIndex, setShownIndex] = useState(0);

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
      if (p.hover || p.focus || p.dialog || !p.visible || document.hidden || Date.now() < p.until) return;
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

  // The main menu and footer link to "/#<service-id>", which lands on that
  // service's card: hold autoplay so the card doesn't slide away on arrival.
  useEffect(() => {
    const ids = new Set(services.map((service) => service.id));
    const holdIfServiceLink = (hash: string) => {
      if (ids.has(decodeURIComponent(hash.slice(1)))) pause.current.until = Date.now() + HOLD_AFTER_INTERACTION_MS;
    };
    holdIfServiceLink(window.location.hash);
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a[href*='#']") : null;
      if (link instanceof HTMLAnchorElement) holdIfServiceLink(link.hash);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [services]);

  // Open/close the native modal dialog to match state, locking page scroll while it's open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    pause.current.dialog = openIndex !== null;
    if (openIndex === null) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
    const root = document.documentElement;
    root.classList.add("is-scroll-locked");
    return () => root.classList.remove("is-scroll-locked");
  }, [openIndex]);

  const openDetails = (index: number) => {
    setShownIndex(index);
    setOpenIndex(index);
  };
  const closeDetails = () => dialogRef.current?.close();

  const trackId = `${baseId}-track`;
  const headingId = `${baseId}-heading`;
  const dialogTitleId = `${baseId}-dialog-title`;
  const shown = services[shownIndex];

  const cards = Array.from({ length: COPIES }, (_, copy) => copy).flatMap((copy) =>
    services.map((service, index) => {
      const isMain = copy === MAIN_COPY;
      return (
        <article
          key={`${copy}-${service.id}`}
          id={isMain ? service.id : undefined}
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
            <button
              type="button"
              className={styles.more}
              tabIndex={isMain ? undefined : -1}
              aria-haspopup="dialog"
              onClick={() => openDetails(index)}
            >
              View {service.shortName} details
              <ArrowRightIcon size={18} />
            </button>
          </div>
        </article>
      );
    }),
  );

  return (
    <section
      id="services"
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

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby={dialogTitleId}
        onClose={() => setOpenIndex(null)}
        // A click whose target is the <dialog> itself landed on the backdrop.
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDetails();
        }}
      >
        <div className={styles.dialogPanel}>
          <button type="button" className={styles.dialogClose} aria-label="Close" onClick={closeDetails}>
            <CloseIcon size={18} />
          </button>
          <div className={styles.dialogMedia}>
            <Image src={shown.image.src} alt="" fill sizes="(max-width: 800px) 100vw, 760px" className={styles.image} />
          </div>
          <div className={styles.dialogBody}>
            <span className="chip">{shown.shortName}</span>
            <h3 id={dialogTitleId} className={styles.dialogTitle}>
              {shown.heading}
            </h3>
            {shown.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </dialog>
    </section>
  );
}
