package com.anhducdt.ecommerce_backend.repositories;

import com.anhducdt.ecommerce_backend.models.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
  @Query("SELECT item from Cart item where item.user.id =: userId")
  Cart findByUserId(@Param("userId") Long userId);
}
