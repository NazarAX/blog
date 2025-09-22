import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { featured } from "../lib/projects";

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.title}>Software Engineer, Builder, Problem-Solver.</h1>
        <p className={styles.subtitle}>
          I design and ship scalable systems and delightful UIs. This is my personal space for articles,
          experiments, and a curated archive of projects.
        </p>
        <div className={styles.cta}>
          <Link to="/projects"><button>Explore Projects</button></Link>
          <a href="mailto:hello@example.com"><button>Get in Touch</button></a>
        </div>
        <p className={styles.note}>Currently hacking on distributed storage, physics engines, and React tooling.</p>
      </section>

      <section className="container">
        <div className={styles.grid}>
          {featured.map(p => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </section>
    </>
  );
}
