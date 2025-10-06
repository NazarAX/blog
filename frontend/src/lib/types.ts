
export type ProjectDto = {
    id: number;
    slug: string;
    name: string;
    description: string | null;
    html: string | null;
    published: boolean;
    coverUrl?: string | null;
    createdAt?: string;
    updatedAt?: string;
};

export type Project = {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    repo?: string;
    demo?: string;
    coverUrl?: string | null;
};

export function mapProject(dto: ProjectDto): Project {
    return {
        slug: dto.slug,
        title: dto.name,
        description: dto.description ?? "",
        tags: [],
        coverUrl: dto.coverUrl ?? null,
    };
}
