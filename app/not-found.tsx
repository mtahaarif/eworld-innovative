import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.notFound}>
      <div className="container">
        <div className={styles.card}>
          <span className="chip">Error 404</span>
          <h1 className={styles.heading}>Oops! That page can’t be found.</h1>
          <p className={styles.text}>It looks like nothing was found at this location.</p>
          <Link href="/" className={styles.button}>
            Back to the homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
