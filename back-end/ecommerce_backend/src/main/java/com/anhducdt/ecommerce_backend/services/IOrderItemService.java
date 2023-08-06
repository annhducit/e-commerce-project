package com.anhducdt.ecommerce_backend.services;

import com.anhducdt.ecommerce_backend.models.OrderItem;

public interface IOrderItemService {
  public OrderItem createOrderItem(OrderItem orderItem);
}
