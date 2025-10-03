package com.nazariitsubera.blog.modules.users.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class AdminAuthController
{
    @GetMapping("/admin/login")
    public String loginPage(@RequestParam(value = "error", required = false) String error,
                            Model model) {
        if (error != null) {
            model.addAttribute("errorMessage", "Invalid username or password.");
        }
        return "login";
    }

    @GetMapping("/admin/index")
    public String indexPage() {
        return "index";
    }
}
