package com.anhducdt.ecommerce_backend.services.impl;
import com.anhducdt.ecommerce_backend.exceptions.CartItemException;
import com.anhducdt.ecommerce_backend.exceptions.UserException;
import com.anhducdt.ecommerce_backend.models.Cart;
import com.anhducdt.ecommerce_backend.models.CartItem;
import com.anhducdt.ecommerce_backend.models.Product;
import com.anhducdt.ecommerce_backend.models.User;
import com.anhducdt.ecommerce_backend.repositories.CartItemRepository;
import com.anhducdt.ecommerce_backend.repositories.CartRepository;
import com.anhducdt.ecommerce_backend.services.ICartItemService;
import com.anhducdt.ecommerce_backend.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartItemService implements ICartItemService {
  private final CartItemRepository cartItemRepository;
  private final CartRepository cartRepository;
  private final IUserService userService;

  @Override
  public CartItem createCartItem(CartItem cartItem) {
    cartItem.setQuantity(1);
    cartItem.setPrice(cartItem.getProduct().getPrice() * cartItem.getQuantity());
    cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountedPrice()*cartItem.getPrice());

    return cartItemRepository.save(cartItem);
  }

  @Override
  public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException {
    CartItem item =  findCartItemById(id);
    User user = userService.findUserById(userId);
    if (user.getId().equals(userId)) {
      item.setQuantity(cartItem.getQuantity());
      item.setPrice(item.getQuantity()*item.getProduct().getPrice());
      item.setDiscountedPrice(item.getProduct().getDiscountedPrice()*item.getQuantity());
    }
    return cartItemRepository.save(item);
  }

  @Override
  public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId) {
    return cartItemRepository.isCartItemExist(cart, product, size, userId);
  }

  @Override
  public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException {
    CartItem cartItem = findCartItemById(cartItemId);
    User user = userService.findUserById(cartItem.getUserId());
    User userRequest = userService.findUserById(userId);

    if (user.getId().equals(userRequest.getId())) {
      cartItemRepository.deleteById(cartItemId);
    } else {
      throw new UserException("You can't remove another user item");
    }
  }

  @Override
  public CartItem findCartItemById(Long cartItemId) throws CartItemException {
    Optional<CartItem> optionalCartItem = cartItemRepository.findById(cartItemId);
    if (optionalCartItem.isPresent()) {
      return optionalCartItem.get();
    }
    throw new CartItemException("Cart item not found");
  }
}
