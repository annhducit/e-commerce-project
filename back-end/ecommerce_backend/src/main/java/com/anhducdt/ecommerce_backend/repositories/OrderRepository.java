package com.anhducdt.ecommerce_backend.repositories;

import com.anhducdt.ecommerce_backend.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
