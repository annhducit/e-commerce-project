package com.anhducdt.ecommerce_backend.services;

import com.anhducdt.ecommerce_backend.dtos.resquests.RatingRequest;
import com.anhducdt.ecommerce_backend.exceptions.ProductException;
import com.anhducdt.ecommerce_backend.models.Product;
import com.anhducdt.ecommerce_backend.models.Rating;
import com.anhducdt.ecommerce_backend.models.User;

import java.util.List;

public interface IRatingService {
  Rating createRating(RatingRequest ratingRequest, User user) throws ProductException;
  List<Rating> getProductRating(Long productId);
}
