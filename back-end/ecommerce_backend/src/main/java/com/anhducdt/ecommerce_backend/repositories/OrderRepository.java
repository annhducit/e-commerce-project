package com.anhducdt.ecommerce_backend.repositories;

import com.anhducdt.ecommerce_backend.models.Order;
import com.anhducdt.ecommerce_backend.models.Product;
import com.anhducdt.ecommerce_backend.models.enums.EOrderStatus;
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

  List<Order> getOrderByOrderStatus(String orderStatus);

  @Query("SELECT item FROM Order item WHERE item.user.id = :userId AND item.orderStatus = :status")
  List<Order> getOrderByOrderStatusAndUser(@Param("userId") Long id, @Param("status") String orderStatus);

  @Query("SELECT o FROM Order o WHERE o.user.phoneNumber LIKE %:keyword% OR o.user.email LIKE %:keyword%")
  List<Order> searchOrderByKeyword(@Param("keyword") String keyword);

}
