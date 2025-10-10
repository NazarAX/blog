import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProject } from "../lib/api";
import type { ProjectDto } from "../lib/types";
import styles from "./Project.module.css";

function toDateOrUndefined(v: unknown): Date | undefined {
    if (v === null || v === undefined || v === "") return undefined;
    if (v instanceof Date) return v;
    if (typeof v === "string" || typeof v === "number") {
        const d = new Date(v);
        return Number.isNaN(d.getTime()) ? undefined : d;
    }
    return undefined;
}

function fmtDate(v: unknown, locale?: string) {
    const d = toDateOrUndefined(v);
    return d ? d.toLocaleDateString(locale) : "—";
}

export default function ProjectPage() {
    const { slug = "" } = useParams<{ slug?: string }>();
    const [project, setProject] = useState<ProjectDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setErr(null);
        fetchProject(slug)
            .then(setProject)
            .catch((e: unknown) =>
                setErr(e instanceof Error ? e.message : "Failed to load project")
            )
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) return <div className={styles.state}>Loading…</div>;
    if (err) return <div className={styles.stateErr}>{err}</div>;
    if (!project) return <div className={styles.state}>Not found.</div>;

    return (
        <article className={styles.wrap}>
            <header className={styles.header}>
                <nav className={styles.breadcrumbs}>
                    <Link to="/projects" className={styles.back}>
                        ← Back to Projects
                    </Link>
                </nav>

                <h1 className={styles.title}>{project.name}</h1>
                {project.description && (
                    <p className={styles.desc}>{project.description}</p>
                )}

                <div className={styles.meta}>
                    <span>Created: {fmtDate(project.createdAt)}</span>
                    <span>Updated: {fmtDate(project.updatedAt)}</span>
                    {project.published ? (
                        <span className={styles.badgeOk}>Published</span>
                    ) : (
                        <span className={styles.badgeDim}>Draft</span>
                    )}
                </div>
            </header>

            {project.coverUrl && (
                <figure className={styles.coverWrap}>
                    <img
                        className={styles.cover}
                        src={project.coverUrl}
                        alt={`${project.name} cover`}
                    />
                </figure>
            )}

            <section
                className={styles.content}
                // ensure html defaults to empty string when missing
                dangerouslySetInnerHTML={{ __html: project.html ?? "" }}
            />
        </article>
    );
}
