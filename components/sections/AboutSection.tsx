import Image from "next/image";
import { about } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { AboutScrollSections } from "./AboutScrollSections";
import styles from "./AboutSection.module.css";

export function AboutSection() {
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
        </Reveal>
      </div>

      <AboutScrollSections tabs={about.tabs} />
    </section>
  );
}
