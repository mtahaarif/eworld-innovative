"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./Reveal.module.css";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Animation duration in seconds. */
  duration?: number;
  /** Delay before the animation starts, in seconds. */
  delay?: number;
};

/**
 * Hides its content until it scrolls into view, then fades it up.
 * Without JavaScript the content is simply visible (see the <noscript> rule in the layout).
 */
export function Reveal({ children, className, duration = 0.6, delay = 0.2 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setRevealed(true);
        observer.disconnect();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = {
    "--reveal-duration": `${duration}s`,
    "--reveal-delay": `${delay}s`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      data-reveal=""
      className={[styles.reveal, revealed && styles.revealed, className].filter(Boolean).join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}
