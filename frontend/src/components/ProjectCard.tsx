import styles from "./ProjectCard.module.css";
import { Link } from "react-router-dom";

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
            <Link to={`/projects/${project.slug}`} className={styles.cardLink} aria-label={project.title} />
            <header className={styles.header}>
                <h3 className={styles.title}>
                    <Link to={`/projects/${project.slug}`}>{project.title}</Link>
                </h3>
            </header>

            <p className={styles.desc}>{project.description}</p>

            {project.tags?.length > 0 && (
                <ul className={styles.meta} aria-label="Tags">
                    {project.tags.map((t) => (
                        <li className={styles.tag} key={t}>{t}</li>
                    ))}
                </ul>
            )}

            <div className={styles.actions}>
                {project.repo && (
                    <a className={`${styles.btn} ${styles.btnGhost}`} href={project.repo} target="_blank" rel="noreferrer">
                        Code
                    </a>
                )}
                {project.demo && (
                    <a className={`${styles.btn} ${styles.btnPrimary}`} href={project.demo} target="_blank" rel="noreferrer">
                        Demo
                    </a>
                )}
            </div>
        </article>
    );
}