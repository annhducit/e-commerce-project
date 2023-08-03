package com.anhducdt.ecommerce_backend.services;

import com.anhducdt.ecommerce_backend.dtos.resquests.AddItemRequest;
import com.anhducdt.ecommerce_backend.exceptions.ProductException;
import com.anhducdt.ecommerce_backend.models.Cart;
import com.anhducdt.ecommerce_backend.models.User;

public interface ICartService {
  Cart createCart(User user);
  String addCartItem(Long userId, AddItemRequest addItemRequest) throws ProductException;
  Cart findUserCart(Long userId);
}
