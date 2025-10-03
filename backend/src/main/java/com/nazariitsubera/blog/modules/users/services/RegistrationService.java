package com.nazariitsubera.blog.modules.users.services;

import com.nazariitsubera.blog.modules.users.domain.Role;
import com.nazariitsubera.blog.modules.users.domain.User;
import com.nazariitsubera.blog.modules.users.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RegistrationService {
    private final UserRepository repo;
    private final PasswordEncoder encoder;
    public RegistrationService(UserRepository repo, PasswordEncoder encoder) {
        this.repo = repo; this.encoder = encoder;
    }

    @Transactional
    public User register(String username, String rawPassword, String email, Role role) {
        var u = new User();
        u.setUsername(username);
        u.setPasswordHash(encoder.encode(rawPassword));
        u.setEmail(email);
        u.setRole(role == null ? Role.USER : role);
        return repo.save(u);
    }
}
