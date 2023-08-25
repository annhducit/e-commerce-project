package com.anhducdt.ecommerce_backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class CartItem {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  @JsonIgnore
  @ManyToOne
  private Cart cart;
  @ManyToOne
  private Product product;
  private String size;
  private int quantity;
  private Integer price;
  private Integer discountedPrice;
  private Long userId;


}
