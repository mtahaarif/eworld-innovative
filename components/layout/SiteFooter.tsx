import Image from "next/image";
import Link from "next/link";
import { footerAbout, images, quickLinks, site } from "@/content/site";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.panel}>
          <div className={styles.grid}>
            <div className={styles.about}>
              {/* The mark PNG has a baked-in white square, so it sits in a white badge. */}
              <span className={styles.badge}>
                <Image
                  src={images.footerMark.src}
                  width={images.footerMark.width}
                  height={images.footerMark.height}
                  alt=""
                  sizes="56px"
                  className={styles.mark}
                />
              </span>
              <p>{footerAbout}</p>
            </div>

            <div>
              <h2 className={styles.title}>Quick Links</h2>
              <ul className={styles.linkList}>
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className={styles.title}>Contact Us</h2>
              <ul className={styles.contactList}>
                <li>
                  <span className={styles.label}>Address</span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </li>
                <li>
                  <span className={styles.label}>Phone</span>
                  <a href={`tel:${site.phone}`}>{site.phone}</a>
                </li>
                <li>
                  <span className={styles.label}>Email</span>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
              </ul>
            </div>

            <div>
              <iframe
                src={site.mapEmbedUrl}
                title={`Map: ${site.address.line1} ${site.address.line2}`}
                width={400}
                height={300}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className={styles.mapFrame}
              />
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>{site.copyright}</div>
      </div>
    </footer>
  );
}
