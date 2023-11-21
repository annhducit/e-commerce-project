package com.anhducdt.ecommerce_backend.services.impl;

import com.anhducdt.ecommerce_backend.dtos.resquests.ReviewRequest;
import com.anhducdt.ecommerce_backend.exceptions.ProductException;
import com.anhducdt.ecommerce_backend.models.Product;
import com.anhducdt.ecommerce_backend.models.Review;
import com.anhducdt.ecommerce_backend.models.User;
import com.anhducdt.ecommerce_backend.repositories.ProductRepository;
import com.anhducdt.ecommerce_backend.repositories.ReviewRepository;
import com.anhducdt.ecommerce_backend.services.IProductService;
import com.anhducdt.ecommerce_backend.services.IReviewService;
import com.anhducdt.ecommerce_backend.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
@Service
@RequiredArgsConstructor
public class ReviewService implements IReviewService {

  private final IProductService productService;
  private final ReviewRepository reviewRepository;

  @Override
  public Review createReview(ReviewRequest reviewRequest, User user) throws ProductException {
    Product product = productService.getProductById(reviewRequest.getProductId());
    Review review = new Review();
    review.setUser(user);
    review.setProduct(product);
    review.setCreateAt(LocalDate.now());
    review.setReview(reviewRequest.getReview());
    return reviewRepository.save(review);
  }

  @Override
  public List<Review> getProductReview(Long productId) {
    return reviewRepository.getAllReviewProduct(productId);
  }

  @Override
  public void deleteReview(Long id) {
    reviewRepository.deleteById(id);
  }
}
