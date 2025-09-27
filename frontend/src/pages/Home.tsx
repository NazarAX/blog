import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { featured } from "../lib/projects";

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.name}>Nazarii Tsubera</h1>
        <h2 className={styles.title}>Software Engineer, Builder, Problem-Solver.</h2>

        <p className={styles.subtitle}>
          I design and ship scalable systems and delightful UIs. This is my personal space for articles,
          experiments, and a curated archive of projects.
        </p>

        <div className={styles.cta}>
          <Link to="/projects" className="btn btnPrimary">Explore Projects</Link>
          <a href="mailto:hello@example.com" className="btn btnGhost">Get in Touch</a>
        </div>

        <p className={styles.note}>
          Currently hacking on distributed storage, physics engines, and React tooling.
        </p>
      </section>

      <section className="container">
        <div className={styles.grid}>
          {featured.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </section>
    </>
  );
}
