package com.nazariitsubera.blog.modules.projects.api;


import com.nazariitsubera.blog.modules.projects.dto.ProjectDto;
import com.nazariitsubera.blog.modules.projects.dto.ProjectMapper;
import com.nazariitsubera.blog.modules.projects.domain.Project;
import com.nazariitsubera.blog.modules.projects.services.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ApiProjectsController {

    private final ProjectService projectService;

    public ApiProjectsController(ProjectService projectService) {
        this.projectService = projectService;
    }


    @GetMapping("/list")
    public List<ProjectDto> getList() {
        return projectService.getAll()
                .stream()
                .map(ProjectMapper::toDto)
                .toList();
    }


    @GetMapping("/{slug}")
    public ResponseEntity<ProjectDto> getOne(@PathVariable String slug) {
        return projectService.getBySlug(slug)
                .map(p -> ResponseEntity.ok(ProjectMapper.toDto(p)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
