
import type {ProjectDto} from "./types.ts";

const API_BASE = import.meta.env.VITE_API_BASE || "";

export async function fetchProjects(): Promise<ProjectDto[]> {
    const res = await fetch(`${API_BASE}/api/projects/list`, {
    });
    if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status}`);
    return res.json();
}

export async function fetchProject(slug: string): Promise<ProjectDto> {
    const res = await fetch(`${API_BASE}/api/projects/${slug}`, {
    });
    if (!res.ok) throw new Error(`Project not found (${slug})`);
    return res.json();
}