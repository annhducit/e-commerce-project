package com.anhducdt.ecommerce_backend.controllers;

import com.anhducdt.ecommerce_backend.dtos.responses.PaginationResponse;
import com.anhducdt.ecommerce_backend.dtos.resquests.UpdateUserInfoRequest;
import com.anhducdt.ecommerce_backend.exceptions.UserException;
import com.anhducdt.ecommerce_backend.models.User;
import com.anhducdt.ecommerce_backend.models.enums.EAccountStatus;
import com.anhducdt.ecommerce_backend.services.IUserService;
import jakarta.validation.Valid;
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


  @PutMapping("/updateProfile")
  public ResponseEntity<User> updateUserProfile(@RequestHeader("Authorization") String jwt, @RequestBody UpdateUserInfoRequest updateUserInfoRequest) {
    try {
      User user = userService.updateUserInfo(jwt, updateUserInfoRequest);
      return new ResponseEntity<>(user, HttpStatus.OK);
    } catch (UserException e) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @PutMapping("/{id}/accountStatus")
  public ResponseEntity<User> approveAccountUser(@PathVariable Long id, @RequestParam EAccountStatus status) {
    try {

      User user = userService.updateAccountStatus(id, status);
      return new ResponseEntity<>(user, HttpStatus.OK);
    } catch (UserException e) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @GetMapping("/search")
  public ResponseEntity<List<User>> searchAccountByKeyword(@RequestParam("keyword") String keyword) {
    List<User> userList = userService.searchAccountByKeyword(keyword);
    return new ResponseEntity<>(userList, HttpStatus.OK);
  }
}
