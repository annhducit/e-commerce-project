package com.anhducdt.ecommerce_backend.repositories;

import com.anhducdt.ecommerce_backend.models.Cart;
import com.anhducdt.ecommerce_backend.models.CartItem;
import com.anhducdt.ecommerce_backend.models.Product;
import com.anhducdt.ecommerce_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
  @Query("SELECT item FROM CartItem item WHERE item.cart = :cart AND item.product = :product AND item.size = :size AND item.userId = :userId")
  CartItem isCartItemExist(@Param("cart")Cart cart, @Param("product")Product product, @Param("size") String size, @Param("userId") Long userId);
}
