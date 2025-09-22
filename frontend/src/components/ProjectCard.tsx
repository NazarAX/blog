import styles from "./ProjectCard.module.css";

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  repo?: string;
  demo?: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.desc}>{project.description}</p>
      <div className={styles.meta}>
        {project.tags.map(t => <span className={styles.tag} key={t}>{t}</span>)}
      </div>
      <div className={styles.actions}>
        {project.repo && <a className={styles.link} href={project.repo} target="_blank" rel="noreferrer">Code</a>}
        {project.demo && <a className={styles.link} href={project.demo} target="_blank" rel="noreferrer">Demo</a>}
      </div>
    </article>
  );
}
