package com.anhducdt.ecommerce_backend.controllers;

import com.anhducdt.ecommerce_backend.dtos.resquests.AddItemRequest;
import com.anhducdt.ecommerce_backend.exceptions.ProductException;
import com.anhducdt.ecommerce_backend.exceptions.UserException;
import com.anhducdt.ecommerce_backend.models.Cart;
import com.anhducdt.ecommerce_backend.models.User;
import com.anhducdt.ecommerce_backend.services.ICartService;
import com.anhducdt.ecommerce_backend.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carts")
@RequiredArgsConstructor
public class CartController {

  private final ICartService cartService;
  private final IUserService userService;

  @PostMapping
  public ResponseEntity<Cart> createCart(@RequestBody User user) {
    Cart cart = cartService.createCart(user);
    return ResponseEntity.status(HttpStatus.CREATED).body(cart);
  }

  @PostMapping("/add")
  public ResponseEntity<String> addCartItem(@RequestHeader("Authorization") String jwt, @RequestBody AddItemRequest addItemRequest) throws UserException{
    try {
      User user = userService.findUserByJwt(jwt);
      String message = cartService.addCartItem(user.getId(), addItemRequest);
      return ResponseEntity.ok(message);
    } catch (ProductException e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
  }

  @GetMapping
  public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String jwt) throws UserException {
    User user = userService.findUserByJwt(jwt);
    Cart cart = cartService.findUserCart(user.getId());
    return new ResponseEntity<>(cart, HttpStatus.OK);
  }
}
