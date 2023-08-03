package com.anhducdt.ecommerce_backend.services;

import com.anhducdt.ecommerce_backend.exceptions.CartItemException;
import com.anhducdt.ecommerce_backend.exceptions.UserException;
import com.anhducdt.ecommerce_backend.models.Cart;
import com.anhducdt.ecommerce_backend.models.CartItem;
import com.anhducdt.ecommerce_backend.models.Product;

public interface ICartItemService {
  CartItem createCartItem(CartItem cartItem);
  CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException;
  CartItem isCartItemExist(Cart cart, Product product, String size, Long userId);
  void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException;
  CartItem findCartItemById(Long cartItemId) throws CartItemException;

}
