package com.anhducdt.ecommerce_backend.dtos.resquests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RatingRequest {
  private Long productId;
  private double rating;
}
