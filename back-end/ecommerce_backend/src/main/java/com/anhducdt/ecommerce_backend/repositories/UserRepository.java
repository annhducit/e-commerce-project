package com.anhducdt.ecommerce_backend.repositories;

import com.anhducdt.ecommerce_backend.dtos.resquests.UpdateUserInfoRequest;
import com.anhducdt.ecommerce_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByEmail(String email);
}
