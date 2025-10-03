package com.nazariitsubera.blog.config.security;

import com.nazariitsubera.blog.modules.users.repositories.UserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository repo;
    public UserDetailsServiceImpl(UserRepository repo) { this.repo = repo; }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repo.findByUsername(username)
                .map(SecurityUser::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }
}
