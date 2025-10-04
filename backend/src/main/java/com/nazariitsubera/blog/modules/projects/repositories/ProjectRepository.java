package com.nazariitsubera.blog.modules.projects.repositories;

import com.nazariitsubera.blog.modules.projects.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Project findBySlug(String slug);
    Project findByName(String name);
}
