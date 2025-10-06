package com.nazariitsubera.blog.modules.projects.repositories;

import com.nazariitsubera.blog.modules.projects.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findBySlug(String slug);
    Optional<Project> findByName(String name);
    boolean existsBySlug(String slug);
}
