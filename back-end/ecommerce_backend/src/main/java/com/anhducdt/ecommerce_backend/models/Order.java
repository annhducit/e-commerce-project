package com.anhducdt.ecommerce_backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Table(name = "orders")
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  @Column(name = "order_id")
  private String orderId;
  @ManyToOne
  private User user;
  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
  private List<OrderItem> orderItems = new ArrayList<>();
  private LocalDateTime orderDate;
  private LocalDateTime deliveryDate;
  @OneToOne
  private Address shippingAddress;
  @Embedded
  private PaymentDetails paymentDetails = new PaymentDetails();
  private double totalPrice;
  private Integer totalDiscountPrice;
  private Integer discount;
  private String orderStatus;
  private LocalDateTime createdAt;
  private Integer totalItems;


}
