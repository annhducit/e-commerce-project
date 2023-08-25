package com.anhducdt.ecommerce_backend.controllers;

import com.anhducdt.ecommerce_backend.dtos.resquests.ReviewRequest;
import com.anhducdt.ecommerce_backend.exceptions.CartItemException;
import com.anhducdt.ecommerce_backend.exceptions.ProductException;
import com.anhducdt.ecommerce_backend.exceptions.ReviewException;
import com.anhducdt.ecommerce_backend.exceptions.UserException;
import com.anhducdt.ecommerce_backend.models.Address;
import com.anhducdt.ecommerce_backend.models.Order;
import com.anhducdt.ecommerce_backend.models.Review;
import com.anhducdt.ecommerce_backend.models.User;
import com.anhducdt.ecommerce_backend.services.IReviewService;
import com.anhducdt.ecommerce_backend.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/reviews")
public class ReviewController {
  private final IReviewService reviewService;
  private final IUserService userService;

  @PostMapping
  public ResponseEntity<Review> createReview(@RequestHeader("Authorization") String jwt, @RequestBody ReviewRequest reviewRequest) throws UserException, ProductException {
    User user = userService.findUserByJwt(jwt);
    Review review = reviewService.createReview(reviewRequest, user);
    return new ResponseEntity<>(review, HttpStatus.CREATED);
  }

  @DeleteMapping("{id}")
  public ResponseEntity<String> deleteReview(@PathVariable Long id) {
    try {
      reviewService.deleteReview(id);
      return new ResponseEntity<>("Delete review success!", HttpStatus.OK);
    } catch (ReviewException e) {
      return new ResponseEntity<>("Delete review fail!", HttpStatus.NO_CONTENT);
    }
  }

}
