package com.nazariitsubera.blog.modules.users.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController
{
    @GetMapping
    public String login(){
        return "";
    }
}
