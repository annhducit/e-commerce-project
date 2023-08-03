package com.anhducdt.ecommerce_backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @JsonIgnore
  @ManyToOne
  private Order order;
  @ManyToOne
  private Product product;
  private String size;
  private int quantity;
  private Integer price;
  private Integer discountPrice;
  private Long userId;
  private LocalDateTime deliveryDate;
}
