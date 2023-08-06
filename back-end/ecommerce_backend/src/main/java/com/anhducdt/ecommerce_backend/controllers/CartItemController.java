package com.anhducdt.ecommerce_backend.controllers;

import com.anhducdt.ecommerce_backend.exceptions.CartItemException;
import com.anhducdt.ecommerce_backend.exceptions.UserException;
import com.anhducdt.ecommerce_backend.models.CartItem;
import com.anhducdt.ecommerce_backend.models.User;
import com.anhducdt.ecommerce_backend.services.ICartItemService;
import com.anhducdt.ecommerce_backend.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart_items")
@RequiredArgsConstructor
public class CartItemController {

  private final ICartItemService cartItemService;
  private final IUserService userService;

  @PutMapping("/{cartItemId}")
  public ResponseEntity<CartItem> updateCartItem(
    @RequestHeader("Authorization") String jwt,
    @PathVariable Long cartItemId,
    @RequestBody CartItem cartItem
  ) {
    try {
      User user = userService.findUserByJwt(jwt);
      CartItem updatedCartItem = cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);
      return new ResponseEntity<>(updatedCartItem, HttpStatus.OK);
    } catch (CartItemException | UserException e) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }

  @DeleteMapping("/{cartItemId}")
  public ResponseEntity<String> removeCartItem(@RequestHeader("Authorization") String jwt, @PathVariable Long cartItemId) {
    try {
        User user = userService.findUserByJwt(jwt);
      cartItemService.removeCartItem(user.getId(), cartItemId);
      return new ResponseEntity<>("Cart item removed successfully.", HttpStatus.OK);
    } catch (CartItemException | UserException e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
  }

}
