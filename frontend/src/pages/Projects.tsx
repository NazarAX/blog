import styles from "./Projects.module.css";
import ProjectCard from "../components/ProjectCard";
import { featured } from "../lib/projects";

export default function Projects() {
  return (
    <>
      <header className={styles.head}>
        <h1>Projects</h1>
        <p>Selected work across systems, graphics, and web.</p>
      </header>
      <div className={styles.grid}>
        {featured.map(p => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </>
  );
}
