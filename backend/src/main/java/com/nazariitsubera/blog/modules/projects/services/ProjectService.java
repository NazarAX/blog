package com.nazariitsubera.blog.modules.projects.services;

import com.nazariitsubera.blog.modules.projects.domain.Project;
import com.nazariitsubera.blog.modules.projects.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService
{
    @Autowired
    private ProjectRepository projectRepository;


    public Project getProjectBySlug(String slug) {
        return projectRepository.findBySlug(slug);
    }

    public List<Project> getAllProjects(){
        return projectRepository.findAll();
    }


}
