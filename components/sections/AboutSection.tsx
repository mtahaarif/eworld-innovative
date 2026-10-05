import Image from "next/image";
import Link from "next/link";
import { about } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import styles from "./AboutSection.module.css";

/** Photo beside a glass card with the company introduction. On the homepage it links on to /about. */
export function AboutSection({ showMoreLink = false }: { showMoreLink?: boolean }) {
  return (
    <section id={about.id} className={styles.about}>
      <div className={`container ${styles.intro}`}>
        <div className={styles.media}>
          <Image src={about.image.src} alt="" fill sizes="(max-width: 991px) 90vw, 560px" className={styles.mediaImage} />
        </div>

        <Reveal className={styles.card}>
          <span className="chip">About Us</span>
          <h2 className={styles.heading}>{about.heading}</h2>
          <div className={styles.body}>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {showMoreLink && (
            <Link href="/about" className={`button ${styles.more}`}>
              Learn more about us
              <ArrowRightIcon size={18} />
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}
