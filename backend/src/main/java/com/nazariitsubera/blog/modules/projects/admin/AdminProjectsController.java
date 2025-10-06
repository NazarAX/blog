package com.nazariitsubera.blog.modules.projects.admin;

import com.nazariitsubera.blog.modules.projects.domain.Project;
import com.nazariitsubera.blog.modules.projects.dto.ProjectDto;
import com.nazariitsubera.blog.modules.projects.dto.ProjectMapper;
import com.nazariitsubera.blog.modules.projects.services.ProjectService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;

@Controller
@RequestMapping("/admin/projects")
public class AdminProjectsController {

    private final ProjectService projectService;

    public AdminProjectsController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping({"", "/"})
    public String projects(Model model) {
        List<ProjectDto> projects = projectService.getAll()
                .stream()
                .map(ProjectMapper::toDto)
                .toList();

        model.addAttribute("projects", projects);
        model.addAttribute("activeMenu", "projects");
        model.addAttribute("pageTitle", "Projects");
        return "projects/index";
    }

    @GetMapping("/project/{id}")
    public String project(@PathVariable Long id, Model model) {
        Optional<Project> project = projectService.getById(id);

        if (project.isEmpty()) {
            return "error/404";
        }

        model.addAttribute("project", ProjectMapper.toDto(project.get()));
        model.addAttribute("activeMenu", "projects");
        model.addAttribute("pageTitle", "Project Details");
        return "projects/project";
    }

    @GetMapping("/create")
    public String createForm(Model model) {
        model.addAttribute("project", new ProjectDto());
        model.addAttribute("activeMenu", "projects");
        model.addAttribute("pageTitle", "Create Project");
        return "projects/form";
    }

    @PostMapping("/create")
    public String create(@ModelAttribute("project") ProjectDto projectDto) {
        Project saved = projectService.createFromDto(projectDto);
        return "redirect:/admin/projects/index";
    }

    @GetMapping("/project/{id}/edit")
    public String editForm(@PathVariable Long id, Model model) {
        Optional<Project> project = projectService.getById(id);
        if (project.isEmpty()) {
            return "error/404";
        }
        model.addAttribute("project", ProjectMapper.toDto(project.get()));
        model.addAttribute("activeMenu", "projects");
        model.addAttribute("pageTitle", "Edit Project");
        return "projects/form";
    }

    @PostMapping("/edit")
    public String edit(@ModelAttribute("project") ProjectDto projectDto) {
        Project updated = projectService.updateFromDto(projectDto);
        return "redirect:/admin/projects/project/" + updated.getId();
    }

    @PostMapping("/project/{id}/delete")
    public String delete(@PathVariable Long id) {
        projectService.deleteById(id);
        return "redirect:/admin/projects";
    }
}
