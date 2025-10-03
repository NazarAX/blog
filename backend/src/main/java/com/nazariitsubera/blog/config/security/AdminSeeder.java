package com.nazariitsubera.blog.config.security;

import com.nazariitsubera.blog.modules.users.domain.Role;
import com.nazariitsubera.blog.modules.users.domain.User;
import com.nazariitsubera.blog.modules.users.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
public class AdminSeeder {

    @Bean
    CommandLineRunner seedAdmin(UserRepository users, PasswordEncoder encoder,
                                @Value("${app.bootstrap.admin.username:}") String username,
                                @Value("${app.bootstrap.admin.password:}") String password) {
        return args -> {
            if (users.findByRole(Role.ADMIN).isEmpty()) {
                if (!username.isBlank() && !password.isBlank()) {
                    var admin = new User();
                    admin.setUsername(username);
                    admin.setPasswordHash(encoder.encode(password));
                    admin.setEmail(username + "@example.com");
                    admin.setRole(Role.ADMIN);
                    users.save(admin);
                    System.out.println("Seeded admin: " + username);
                } else {
                    System.out.println("No admin seed vars provided — skipping.");
                }
            }
        };
    }
}
