package com.anhducdt.ecommerce_backend.services;

import com.anhducdt.ecommerce_backend.dtos.resquests.ReviewRequest;
import com.anhducdt.ecommerce_backend.exceptions.ProductException;
import com.anhducdt.ecommerce_backend.models.Review;
import com.anhducdt.ecommerce_backend.models.User;

import java.util.List;

public interface IReviewService {
  Review createReview(ReviewRequest reviewRequest, User user) throws ProductException;
  List<Review> getProductReview(Long productId);
}
