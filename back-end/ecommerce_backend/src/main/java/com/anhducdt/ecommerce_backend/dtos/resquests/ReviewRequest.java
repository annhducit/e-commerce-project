package com.anhducdt.ecommerce_backend.dtos.resquests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewRequest {
  private Long productId;
  private String review;
}
