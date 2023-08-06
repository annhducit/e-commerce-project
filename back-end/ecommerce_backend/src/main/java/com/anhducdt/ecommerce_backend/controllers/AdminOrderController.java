package com.anhducdt.ecommerce_backend.controllers;

import com.anhducdt.ecommerce_backend.exceptions.OrderException;
import com.anhducdt.ecommerce_backend.models.Order;
import com.anhducdt.ecommerce_backend.services.IOrderService;
import com.anhducdt.ecommerce_backend.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
@RequiredArgsConstructor
public class AdminOrderController {
  private final IOrderService orderService;

  @PutMapping("/{id}/placed")
  public ResponseEntity<Order> placeOrder(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws OrderException {
      Order order = orderService.placedOrder(id);
      return new ResponseEntity<>(order, HttpStatus.OK);

  }

  @PutMapping("/{id}/confirmed")
  public ResponseEntity<Order> confirmOrder(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws OrderException {
      Order order = orderService.confirmedOrder(id);
      return new ResponseEntity<>(order, HttpStatus.OK);

  }

  @PutMapping("/{id}/shipped")
  public ResponseEntity<Order> shipOrder(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws OrderException {
      Order order = orderService.shippedOrder(id);
      return new ResponseEntity<>(order, HttpStatus.OK);

  }

  @PutMapping("/{id}/delivered")
  public ResponseEntity<Order> deliverOrder(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws OrderException {
      Order order = orderService.diliveredOrder(id);
      return new ResponseEntity<>(order, HttpStatus.OK);
  }

  @PutMapping("/{id}/canceled")
  public ResponseEntity<Order> cancelOrder(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws OrderException {
      Order order = orderService.canceledOrder(id);
      return new ResponseEntity<>(order, HttpStatus.OK);

  }

  @GetMapping
  public ResponseEntity<List<Order>> getAllOrders() throws OrderException {
      List<Order> allOrders = orderService.getAllOrder();
      return new ResponseEntity<>(allOrders, HttpStatus.OK);
  }

  @DeleteMapping("/{id}/delete")
  public ResponseEntity<Void> deleteOrder(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws OrderException {
      orderService.deleteOrder(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
