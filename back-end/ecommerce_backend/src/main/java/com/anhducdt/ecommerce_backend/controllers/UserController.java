package com.anhducdt.ecommerce_backend.controllers;

import com.anhducdt.ecommerce_backend.exceptions.UserException;
import com.anhducdt.ecommerce_backend.models.User;
import com.anhducdt.ecommerce_backend.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

  private final IUserService userService;

  @Autowired
  public UserController(IUserService userService) {
    this.userService = userService;
  }

  @GetMapping("/{id}")
  public ResponseEntity<User> getUserById(@PathVariable Long id) {
    try {
      User user = userService.findUserById(id);
      return new ResponseEntity<>(user, HttpStatus.OK);
    } catch (UserException e) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @GetMapping("/profile")
  public ResponseEntity<User> getUserByJwt(@RequestHeader("Authorization") String jwt) {
    try {
      User user = userService.findUserByJwt(jwt);
      return new ResponseEntity<>(user, HttpStatus.OK);
    } catch (UserException e) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  // Other methods for creating, updating, and deleting users can be added here
}
