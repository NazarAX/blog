import { useEffect, useState } from "react";
import styles from "./Projects.module.css";
import ProjectCard from "../components/ProjectCard";
import type { Project } from "../components/ProjectCard";
import { fetchProjects } from "../lib/api";
import { mapProject, type ProjectDto } from "../lib/types";

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState<string | null>(null);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const data: ProjectDto[] = await fetchProjects();
                if (!alive) return;
                console.log(data);
                const mapped = data.filter(p => p.published).map(mapProject);
                setProjects(mapped);
            } catch (e) {
                if (!alive) return;
                setError(e instanceof Error ? e.message : String(e));
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, []);

    return (
        <>
            <header className={styles.head}>
                <h1>Projects</h1>
                <p>Selected work across systems, graphics, and web.</p>
            </header>

            {loading && <div className={styles.status}>Loading…</div>}
            {error && <div className={styles.error}>Error: {error}</div>}

            {!loading && !error && (
                <div className={styles.grid}>
                    {projects.map(p => (
                        <ProjectCard key={p.slug} project={p} />
                    ))}
                    {projects.length === 0 && (
                        <div className={styles.empty}>No projects yet.</div>
                    )}
                </div>
            )}
        </>
    );
}