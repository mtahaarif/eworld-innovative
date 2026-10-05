import Image from "next/image";
import type { ServiceRow } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./ServiceDetails.module.css";

/** The full write-up for every service, as alternating photo + glass-card rows. Each row is a link target (/services#<id>). */
export function ServiceDetails({ services }: { services: readonly ServiceRow[] }) {
  return (
    <div className={`container ${styles.list}`}>
      {services.map((service, index) => (
        <section key={service.id} id={service.id} className={index % 2 ? `${styles.row} ${styles.flipped}` : styles.row}>
          <div className={styles.media}>
            <Image src={service.image.src} alt="" fill sizes="(max-width: 991px) 90vw, 520px" className={styles.image} />
          </div>
          <Reveal className={styles.card}>
            <span className="chip">
              {String(index + 1).padStart(2, "0")} · {service.shortName}
            </span>
            <h2 className={styles.heading}>{service.heading}</h2>
            <div className={styles.body}>
              {service.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </section>
      ))}
    </div>
  );
}
