package com.anhducdt.ecommerce_backend.repositories;

import com.anhducdt.ecommerce_backend.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
  @Query("SELECT item FROM Order item WHERE item.user.id = :userId AND " +
    "(item.orderStatus = 'PLACED' OR item.orderStatus = 'CONFIRMED' OR " +
    "item.orderStatus = 'SHIPPED' OR item.orderStatus = 'DELIVERED')")
  List<Order> getUsersOrders(@Param("userId") Long id);
}
