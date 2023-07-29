package com.anhducdt.ecommerce_backend.repositories;

import com.anhducdt.ecommerce_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findUserByEmail(String email);
}
