package com.anhducdt.ecommerce_backend.services.impl;

import com.anhducdt.ecommerce_backend.dtos.resquests.RatingRequest;
import com.anhducdt.ecommerce_backend.exceptions.ProductException;
import com.anhducdt.ecommerce_backend.models.Product;
import com.anhducdt.ecommerce_backend.models.Rating;
import com.anhducdt.ecommerce_backend.models.User;
import com.anhducdt.ecommerce_backend.repositories.RatingRepository;
import com.anhducdt.ecommerce_backend.services.IProductService;
import com.anhducdt.ecommerce_backend.services.IRatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
@RequiredArgsConstructor
public class RatingService implements IRatingService {

  private final RatingRepository ratingRepository;
  private final IProductService productService;
  @Override
  public Rating createRating(RatingRequest ratingRequest, User user) throws ProductException {
    Product product = productService.getProductById(ratingRequest.getProductId());
    Rating rating = new Rating();
    rating.setProduct(product);
    rating.setRating(ratingRequest.getRating());
    rating.setUser(user);
    rating.setCreateAt(LocalDateTime.now());
    return ratingRepository.save(rating);
  }

  @Override
  public List<Rating> getProductRating(Long productId) {
    return ratingRepository.getAllProductRating(productId);
  }
}
