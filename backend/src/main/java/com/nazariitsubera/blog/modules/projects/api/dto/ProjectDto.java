package com.nazariitsubera.blog.modules.projects.api.dto;

import java.time.Instant;

public class ProjectDto {
    public Long id;
    public String slug;
    public String name;
    public String description;
    public String html;
    public boolean published;
    public String coverUrl;
    public Instant createdAt;
    public Instant updatedAt;
}