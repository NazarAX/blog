import styles from "./About.module.css";

export default function About() {
  return (
    <div className={styles.wrap}>
      <h1>About</h1>
      <p>
        I’m Nazarii — a software engineer focused on scalable backends, data, and interactive frontends.
        I enjoy building hard things and explaining them simply.
      </p>
      <p>
        Tooling I love: <span className={styles.kbd}>React</span>, <span className={styles.kbd}>TypeScript</span>,
        <span className={styles.kbd}>Symfony</span>, <span className={styles.kbd}>Spring</span>,
        <span className={styles.kbd}>C++</span>, <span className={styles.kbd}>OpenGL</span>.
      </p>
      <p>Beyond code: football, math, and writing about systems that scale.</p>
    </div>
  );
}
