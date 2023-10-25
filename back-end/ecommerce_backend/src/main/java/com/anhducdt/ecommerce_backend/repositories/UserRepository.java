package com.anhducdt.ecommerce_backend.repositories;

import com.anhducdt.ecommerce_backend.dtos.resquests.UpdateUserInfoRequest;
import com.anhducdt.ecommerce_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByEmail(String email);
    @Query("SELECT user FROM User user WHERE user.firstName LIKE %:keyword% OR user.lastName LIKE %:keyword% or user.email LIKE %:keyword% or user.phoneNumber LIKE %:keyword%")
    List<User> searchUserByKeyword(@Param("keyword") String keyword);
}
