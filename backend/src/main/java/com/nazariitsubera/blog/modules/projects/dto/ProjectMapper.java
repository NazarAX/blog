package com.nazariitsubera.blog.modules.projects.dto;

import com.nazariitsubera.blog.modules.projects.domain.Project;

public class ProjectMapper {

    public static ProjectDto toDto(Project project) {
        if (project == null) return null;

        ProjectDto dto = new ProjectDto();
        dto.setId(project.getId());
        dto.setSlug(project.getSlug());
        dto.setName(project.getName());
        dto.setDescription(project.getDescription());
        dto.setHtml(project.getHtml());
        dto.setPublished(project.isPublished());
        dto.setCoverUrl(project.getCover() != null ? project.getCover().getUrl() : null);
        dto.setCreatedAt(project.getCreatedAt());
        dto.setUpdatedAt(project.getUpdatedAt());
        return dto;
    }

    public static Project toEntity(ProjectDto dto) {
        if (dto == null) return null;

        Project p = new Project();
        p.setSlug(dto.getSlug());
        p.setName(dto.getName());
        p.setDescription(dto.getDescription());
        p.setHtml(dto.getHtml());
        p.setPublished(dto.isPublished());
        return p;
    }

    public static void updateEntity(Project p, ProjectDto dto) {
        if (p == null || dto == null) return;

        p.setSlug(dto.getSlug());
        p.setName(dto.getName());
        p.setDescription(dto.getDescription());
        p.setHtml(dto.getHtml());
        p.setPublished(dto.isPublished());
    }
}
