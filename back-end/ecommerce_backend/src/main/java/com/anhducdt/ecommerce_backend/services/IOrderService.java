package com.anhducdt.ecommerce_backend.services;

import com.anhducdt.ecommerce_backend.exceptions.OrderException;
import com.anhducdt.ecommerce_backend.models.Address;
import com.anhducdt.ecommerce_backend.models.Order;
import com.anhducdt.ecommerce_backend.models.User;
import com.anhducdt.ecommerce_backend.models.enums.EOrderStatus;

import java.util.List;

public interface IOrderService {
   Order createOrder(User user, Address address);
   Order getOrderById(Long id) throws OrderException;
   List<Order> getOrderByStatus(EOrderStatus orderStatus);
   List<Order> getOrderByStatusAndUserID(Long id, EOrderStatus orderStatus);
   List<Order> userOrderHistory(Long userId) throws OrderException;
   Order placedOrder(Long id) throws OrderException;
   Order confirmedOrder(Long id) throws OrderException;
   Order shippedOrder (Long id) throws OrderException;
   Order diliveredOrder(Long id) throws OrderException;
   Order canceledOrder(Long id) throws OrderException;
   Order completedOrder(Long id) throws OrderException;
   List<Order> searchOrderByUser(String keyword) throws OrderException;
   List<Order> getAllOrder() throws OrderException;
   void deleteOrder(Long id) throws OrderException;

}
