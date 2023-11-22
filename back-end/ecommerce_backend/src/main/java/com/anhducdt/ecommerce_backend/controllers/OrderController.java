package com.anhducdt.ecommerce_backend.controllers;

import com.anhducdt.ecommerce_backend.exceptions.OrderException;
import com.anhducdt.ecommerce_backend.exceptions.UserException;
import com.anhducdt.ecommerce_backend.models.Address;
import com.anhducdt.ecommerce_backend.models.Order;
import com.anhducdt.ecommerce_backend.models.User;
import com.anhducdt.ecommerce_backend.models.enums.EOrderStatus;
import com.anhducdt.ecommerce_backend.services.IOrderService;
import com.anhducdt.ecommerce_backend.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
  private final IOrderService orderService;
  private final IUserService userService;

  @PostMapping
  public ResponseEntity<Order> createOrder(@RequestBody Address address, @RequestHeader("Authorization") String jwt) throws UserException {
      User user = userService.findUserByJwt(jwt);
      Order order = orderService.createOrder(user, address);
      return new ResponseEntity<>(order, HttpStatus.CREATED);
  }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrder() throws OrderException {
        List<Order> order = orderService.getAllOrder();
        return new ResponseEntity<>(order, HttpStatus.OK);
    }


    @GetMapping("/{id}")
  public ResponseEntity<Order> getOrderById(@PathVariable("id") Long id, @RequestHeader("Authorization") String jwt) throws UserException, OrderException {
    User user = userService.findUserByJwt(jwt);
    Order order = orderService.getOrderById(id);
      return new ResponseEntity<>(order, HttpStatus.OK);
  }

  @GetMapping("/user")
  public ResponseEntity<List<Order>> getUserOrderHistory(@RequestHeader("Authorization") String jwt) throws UserException, OrderException {

      User user = userService.findUserByJwt(jwt);
      List<Order> userOrders = orderService.userOrderHistory(user.getId());
      return new ResponseEntity<>(userOrders, HttpStatus.OK);

  }

    @GetMapping("/userAndOrderStatus")
    public ResponseEntity<List<Order>> getUserOrderByStatus(@RequestHeader("Authorization") String jwt, @RequestParam EOrderStatus status) throws UserException, OrderException {
        User user = userService.findUserByJwt(jwt);
        List<Order> userOrders = orderService.getOrderByStatusAndUserID(user.getId(), status);
        return new ResponseEntity<>(userOrders, HttpStatus.OK);

    }

    @GetMapping("/status")
    public ResponseEntity<List<Order>> getOrderByStatus(@RequestParam EOrderStatus status) throws UserException, OrderException {
        List<Order> userOrders = orderService.getOrderByStatus(status);
        return new ResponseEntity<>(userOrders, HttpStatus.OK);

    }

    @GetMapping("/search")
    public ResponseEntity<List<Order>> searchOrderByKeyword(@RequestParam("keyword") String keyword) throws  OrderException {
        List<Order> results = orderService.searchOrderByUser(keyword);
        return new ResponseEntity<>(results, HttpStatus.OK);

    }

    @GetMapping("/dateCreate")
    public ResponseEntity<List<Order>> searchOrderByKeyword(@RequestParam("startDate") LocalDate createDate,
                                                            @RequestParam("endDate") LocalDate endDate
    ) throws  OrderException {
        List<Order> results = orderService.filterOrderByDateCreated(createDate, endDate);
        return new ResponseEntity<>(results, HttpStatus.OK);

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long id) {
    try {
      orderService.deleteOrder(id);
      return new ResponseEntity<>("Order deleted successfully", HttpStatus.OK);
    } catch (OrderException e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
