"use client";

import { useEffect, useState } from "react";
import { ChevronUpIcon } from "@/components/ui/icons";
import styles from "./ScrollTopButton.module.css";

const SHOW_AFTER = 800;
const DURATION = 1000;

const easeInOutExpo = (t: number) =>
  t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? 2 ** (20 * t - 10) / 2 : (2 - 2 ** (-20 * t + 10)) / 2;

// Each frame's scroll must be "instant": with `scroll-behavior: smooth` on <html>
// (globals.css), a plain scrollTo would start its own smooth scroll every frame.
function scrollToTop() {
  const start = window.scrollY;
  if (start === 0) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: 0, behavior: "instant" });
    return;
  }
  const startTime = performance.now();
  const step = (now: number) => {
    const progress = Math.min(1, (now - startTime) / DURATION);
    window.scrollTo({ top: start * (1 - easeInOutExpo(progress)), behavior: "instant" });
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > SHOW_AFTER);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <button
      type="button"
      className={visible ? `${styles.button} ${styles.visible}` : styles.button}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={scrollToTop}
    >
      <ChevronUpIcon size={18} strokeWidth={2.5} />
    </button>
  );
}
