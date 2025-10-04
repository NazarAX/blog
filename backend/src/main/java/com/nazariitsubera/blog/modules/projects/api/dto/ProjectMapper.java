package com.nazariitsubera.blog.modules.projects.api.dto;

import com.nazariitsubera.blog.modules.projects.domain.Project;

public class ProjectMapper
{
    public static ProjectDto toDto(Project project)
    {
        ProjectDto dto = new ProjectDto();
        dto.id = project.getId();
        dto.slug = project.getSlug();
        dto.name = project.getName();
        dto.description = project.getDescription();
        dto.html = project.getHtml();
        dto.published = project.isPublished();
        dto.createdAt = project.getCreatedAt();
        dto.updatedAt = project.getUpdatedAt();
        return dto;
    }
}
