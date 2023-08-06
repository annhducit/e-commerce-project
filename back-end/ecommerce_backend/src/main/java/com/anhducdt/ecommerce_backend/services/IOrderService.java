package com.anhducdt.ecommerce_backend.services;

import com.anhducdt.ecommerce_backend.exceptions.OrderException;
import com.anhducdt.ecommerce_backend.models.Address;
import com.anhducdt.ecommerce_backend.models.Order;
import com.anhducdt.ecommerce_backend.models.User;

import java.util.List;

public interface IOrderService {
   Order createOrder(User user, Address address);
   Order getOrderById(Long id) throws OrderException;
   List<Order> userOrderHistory(Long userId) throws OrderException;
   Order placedOrder(Long id) throws OrderException;
   Order confirmedOrder(Long id) throws OrderException;
   Order shippedOrder (Long id) throws OrderException;
   Order diliveredOrder(Long id) throws OrderException;
   Order canceledOrder(Long id) throws OrderException;
   List<Order> getAllOrder() throws OrderException;
   void deleteOrder(Long id) throws OrderException;

}
