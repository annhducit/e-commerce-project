package com.anhducdt.ecommerce_backend.services.impl;

import com.anhducdt.ecommerce_backend.exceptions.OrderException;
import com.anhducdt.ecommerce_backend.models.Address;
import com.anhducdt.ecommerce_backend.models.Order;
import com.anhducdt.ecommerce_backend.models.User;
import com.anhducdt.ecommerce_backend.repositories.CartRepository;
import com.anhducdt.ecommerce_backend.services.ICartService;
import com.anhducdt.ecommerce_backend.services.IOrderService;
import com.anhducdt.ecommerce_backend.services.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService {
  private final CartRepository cartRepository;
  private final ICartService cartItemService;
  private final IProductService productService;
  @Override
  public Order createOrder(User user, Address address) {

    return null;
  }

  @Override
  public Order getOrderById(Long id) throws OrderException {
    return null;
  }

  @Override
  public List<Order> userOrderHistory(Long userId) throws OrderException {
    return null;
  }

  @Override
  public Order placedOrder(Long id) throws OrderException {
    return null;
  }

  @Override
  public Order confirmedOrder(Long id) throws OrderException {
    return null;
  }

  @Override
  public Order shippedOrder(Long id) throws OrderException {
    return null;
  }

  @Override
  public Order diliveredOrder(Long id) throws OrderException {
    return null;
  }

  @Override
  public Order canceledOrder(Long id) throws OrderException {
    return null;
  }
}
