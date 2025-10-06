package com.nazariitsubera.blog.modules.projects.services;

import com.nazariitsubera.blog.modules.projects.domain.Project;
import com.nazariitsubera.blog.modules.projects.dto.ProjectDto;
import com.nazariitsubera.blog.modules.projects.dto.ProjectMapper;
import com.nazariitsubera.blog.modules.projects.repositories.ProjectRepository;
import io.micrometer.observation.ObservationFilter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService
{
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }


    public Optional<Project> getBySlug(String slug) {
        return projectRepository.findBySlug(slug);
    }

    public Optional<Project> getById(Long id){
        return projectRepository.findById(id);
    }

    public List<Project> getAll(){
        return projectRepository.findAll();
    }

    public boolean existsById(Long id) {
        return projectRepository.existsById(id);
    }

    public boolean existsBySlug(String slug) {
        return projectRepository.existsBySlug(slug);
    }


    public Project createFromDto(ProjectDto dto) {
        Project p = ProjectMapper.toEntity(dto);
        return projectRepository.save(p);
    }

    public Project updateFromDto(ProjectDto dto) {
        Project existing = projectRepository.findById(dto.getId())
                .orElseThrow(() -> new IllegalArgumentException("Project not found: " + dto.getId()));
        ProjectMapper.updateEntity(existing, dto);
        return projectRepository.save(existing);
    }

    public void deleteById(Long id) {
        projectRepository.deleteById(id);
    }


}
