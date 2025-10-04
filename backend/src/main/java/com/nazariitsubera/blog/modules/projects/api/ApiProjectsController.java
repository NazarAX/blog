package com.nazariitsubera.blog.modules.projects.api;


import com.nazariitsubera.blog.modules.projects.api.dto.ProjectDto;
import com.nazariitsubera.blog.modules.projects.api.dto.ProjectMapper;
import com.nazariitsubera.blog.modules.projects.domain.Project;
import com.nazariitsubera.blog.modules.projects.services.ProjectService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ApiProjectsController {

    @GetMapping("/{slug}")
    public ProjectDto getOne(@PathVariable String slug, ProjectService projectService) {
        Project project = projectService.getProjectBySlug(slug);
        return ProjectMapper.toDto(project);
    }

    @GetMapping("/list")
    public List<ProjectDto> getList(ProjectService projectService) {
        return projectService
                .getAllProjects()
                .stream()
                .map(ProjectMapper::toDto)
                .toList();
    }
}
