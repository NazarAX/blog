package com.nazariitsubera.blog.modules.projects.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDto {
    private Long id;
    private String slug;
    private String name;
    private String description;
    private String html;
    private boolean published;
    private String coverUrl;
    private Instant createdAt;
    private Instant updatedAt;
}
