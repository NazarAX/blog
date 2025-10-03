package com.nazariitsubera.blog.modules.users.repositories;

import com.nazariitsubera.blog.modules.users.domain.Role;
import com.nazariitsubera.blog.modules.users.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByRole(Role role);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}