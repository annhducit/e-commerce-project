package com.anhducdt.ecommerce_backend.services.impl;

import com.anhducdt.ecommerce_backend.models.OrderItem;
import com.anhducdt.ecommerce_backend.repositories.OrderItemRepository;
import com.anhducdt.ecommerce_backend.services.IOrderItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderItemService implements IOrderItemService {
  private final OrderItemRepository orderItemRepository;
  @Override
  public OrderItem createOrderItem(OrderItem orderItem) {
    return orderItemRepository.save(orderItem);
  }
}
