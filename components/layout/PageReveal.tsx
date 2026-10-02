"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import styles from "./PageReveal.module.css";

/** Give up waiting for the window `load` event after this long. */
const LOAD_TIMEOUT = 5000;

let timedOut = false;

function subscribe(onChange: () => void) {
  window.addEventListener("load", onChange);
  const timer = window.setTimeout(() => {
    timedOut = true;
    onChange();
  }, LOAD_TIMEOUT);
  return () => {
    window.removeEventListener("load", onChange);
    window.clearTimeout(timer);
  };
}

const isLoaded = () => timedOut || document.readyState === "complete";
const isLoadedOnServer = () => false;

/**
 * Shows a spinner until the page has finished loading, then fades the page in
 * over 1.5s — the same entrance the live site uses.
 */
export function PageReveal({ children }: { children: ReactNode }) {
  const ready = useSyncExternalStore(subscribe, isLoaded, isLoadedOnServer);

  return (
    <>
      <div className={ready ? `${styles.loader} ${styles.loaderDone}` : styles.loader} aria-hidden="true" />
      <div data-page="" className={ready ? `${styles.page} ${styles.ready}` : styles.page}>
        {children}
      </div>
    </>
  );
}
