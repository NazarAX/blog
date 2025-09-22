
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.foot}>
      <div className={`container ${styles.row}`}>
        <p className={styles.small}>© {new Date().getFullYear()} www.nazariitsubera.com</p>
        <nav className={styles.links}>
          <a href="https://github.com/NazarAX" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/nazarii-tsubera-b4198b240/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:hello@example.com">Email</a>
        </nav>
      </div>
    </footer>
  );
}