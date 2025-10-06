package com.nazariitsubera.blog.modules.projects.api;


import com.nazariitsubera.blog.modules.projects.dto.ProjectDto;
import com.nazariitsubera.blog.modules.projects.dto.ProjectMapper;
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

    private final ProjectService projectService;

    public ApiProjectsController(ProjectService projectService) {
        this.projectService = projectService;
    }


    @GetMapping("/list")
    public List<ProjectDto> getList() {
        return projectService
                .getAll()
                .stream()
                .map(ProjectMapper::toDto)
                .toList();
    }
}
