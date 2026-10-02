"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { images, mainNav, site } from "@/content/site";
import { CloseIcon } from "@/components/ui/icons";
import styles from "./SiteHeader.module.css";

const DESKTOP_QUERY = "(min-width: 992px)";

export function SiteHeader() {
  const [isFixed, setIsFixed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Pin the header to the top of the viewport as soon as the page scrolls.
  useEffect(() => {
    const update = () => setIsFixed(window.scrollY > 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Lock page scrolling while the mobile menu is open; close it with Escape
  // or when the viewport grows to the desktop layout.
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    root.classList.add("is-scroll-locked");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onBreakpoint = () => desktop.matches && closeMenu();

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      root.classList.remove("is-scroll-locked");
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      <div className={menuOpen ? `${styles.overlay} ${styles.overlayShown}` : styles.overlay} onClick={closeMenu} aria-hidden="true">
        <span className={styles.overlayClose}>
          <CloseIcon size={20} />
        </span>
      </div>

      <div className={styles.headerWrap}>
        <header className={isFixed ? `${styles.header} ${styles.fixed}` : styles.header}>
          <div className={`container ${styles.inner}`}>
            <div className={styles.logo}>
              <Link href="/" title={site.name} rel="home">
                <Image src={images.logo.src} width={images.logo.width} height={images.logo.height} alt={site.name} sizes="44px" preload />
              </Link>
            </div>

            <button
              type="button"
              className={menuOpen ? `${styles.burger} ${styles.burgerHidden}` : styles.burger}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <span />
            </button>

            <nav className={styles.nav} aria-label="Main">
              <ul>
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
      </div>

      <nav
        id="mobile-menu"
        className={menuOpen ? `${styles.mobileMenu} ${styles.mobileMenuOpen}` : styles.mobileMenu}
        aria-label="Mobile"
        inert={!menuOpen}
      >
        <ul>
          <li className={styles.mobileLogo}>
            <span>
              <Link href="/" onClick={closeMenu}>
                <Image src={images.mark.src} width={images.mark.width} height={images.mark.height} alt={site.name} sizes="40px" />
              </Link>
            </span>
          </li>
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={closeMenu}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
