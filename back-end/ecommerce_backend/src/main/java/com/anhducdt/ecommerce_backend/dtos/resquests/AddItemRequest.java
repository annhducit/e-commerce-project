package com.anhducdt.ecommerce_backend.dtos.resquests;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AddItemRequest {
  private Long id;
  private String size;
  private int quantity;
  private Integer price;
  private Long productId;


}
