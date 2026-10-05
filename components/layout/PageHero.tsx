import Image from "next/image";
import Link from "next/link";
import styles from "./PageHero.module.css";

type PageHeroProps = {
  /** Small label above the title, also used as the breadcrumb's current page. */
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
};

/** Banner at the top of the inner pages: a rounded photo frame (like the home hero) with the page title on frosted glass. */
export function PageHero({ eyebrow, title, subtitle, image }: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <Image src={image} alt="" fill preload sizes="100vw" className={styles.image} />
      <div className={`container ${styles.content}`}>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{eyebrow}</span>
        </nav>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </section>
  );
}
