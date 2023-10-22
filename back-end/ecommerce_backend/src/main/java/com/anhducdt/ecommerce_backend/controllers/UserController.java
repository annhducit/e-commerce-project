package com.anhducdt.ecommerce_backend.controllers;

import com.anhducdt.ecommerce_backend.dtos.responses.PaginationResponse;
import com.anhducdt.ecommerce_backend.dtos.resquests.UpdateUserInfoRequest;
import com.anhducdt.ecommerce_backend.exceptions.UserException;
import com.anhducdt.ecommerce_backend.models.User;
import com.anhducdt.ecommerce_backend.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
  @GetMapping("/all")
  public PaginationResponse getAllUsers(
      @RequestParam(defaultValue = "1") Integer page,
      @RequestParam(defaultValue = "10") Integer pageSize) {

    return userService.findAllAccounts(page, pageSize);
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

  @PutMapping("/{id}/profile")
  public ResponseEntity<User> updateUserProfile(@PathVariable Long id, @RequestBody UpdateUserInfoRequest updateUserInfoRequest) {
    try {
      User user = userService.updateUserInfo(id, updateUserInfoRequest);
      return new ResponseEntity<>(user, HttpStatus.OK);
    } catch (UserException e) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

}
