package com.anhducdt.ecommerce_backend.services.impl;

import com.anhducdt.ecommerce_backend.exceptions.OrderException;
import com.anhducdt.ecommerce_backend.models.*;
import com.anhducdt.ecommerce_backend.models.enums.OrderStatus;
import com.anhducdt.ecommerce_backend.repositories.*;
import com.anhducdt.ecommerce_backend.services.ICartService;
import com.anhducdt.ecommerce_backend.services.IOrderItemService;
import com.anhducdt.ecommerce_backend.services.IOrderService;
import com.anhducdt.ecommerce_backend.services.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.spec.OAEPParameterSpec;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService {
  private final IOrderItemService orderItemService;
  private final ICartService cartService;
  private final IProductService productService;
  private final UserRepository userRepository;
  private final CartRepository cartRepository;
  private final OrderRepository orderRepository;
  private final OrderItemRepository orderItemRepository;
  private final AddressRepository addressRepository;
  @Override
  public Order createOrder(User user, Address address) {
    address.setUser(user);
    Address userAddress = addressRepository.save(address);
    user.getAddress().add(userAddress);
    userRepository.save(user);

    Cart cart = cartService.findUserCart(user.getId());
    List<OrderItem> orderItemList = new ArrayList<>();

    for (CartItem cartItem :  cart.getCartItems()) {
      OrderItem orderItem = new OrderItem();
      orderItem.setPrice(cartItem.getPrice());
      orderItem.setProduct(cartItem.getProduct());
      orderItem.setQuantity(cartItem.getQuantity());
      orderItem.setSize(cartItem.getSize());
      orderItem.setUserId(cartItem.getUserId());
      orderItem.setDiscountPrice(cartItem.getDiscountedPrice());
      OrderItem createOrderItem = orderItemRepository.save(orderItem);
      orderItemList.add(createOrderItem);
    }

    Order order = new Order();
    order.setUser(user);
    order.setOrderItems(orderItemList);
    order.setTotalPrice(cart.getTotalPrice());
    order.setTotalDiscountPrice(cart.getTotalDiscountPrice());
    order.setDiscount(cart.getDiscount());
    order.setTotalItems(cart.getTotalItem());

    order.setShippingAddress(address);
    order.setOrderDate(LocalDateTime.now());
    order.setOrderStatus(String.valueOf(OrderStatus.PENDING));
    order.getPaymentDetails().setPaymentStatus(String.valueOf(OrderStatus.PENDING));
    order.setCreatedAt(LocalDateTime.now());
    order.setTotalItems(cart.getTotalItem());

  Order savedOrder = orderRepository.save(order);
  for (OrderItem item: orderItemList) {
    item.setOrder(savedOrder);
    orderItemRepository.save(item);
  }


    return savedOrder;
  }

  @Override
  public Order getOrderById(Long id) throws OrderException {
    Optional<Order> order = orderRepository.findById(id);
    if (order.isPresent()) {
      return order.get();
    }
    throw new OrderException("Order not exist with id: "+id);
  }

  @Override
  public List<Order> userOrderHistory(Long userId) throws OrderException {
    return orderRepository.getUsersOrders(userId);
  }

  @Override
  public Order placedOrder(Long id) throws OrderException {
    Order order = getOrderById(id);
    order.setOrderStatus(String.valueOf(OrderStatus.PLACED));
    order.getPaymentDetails().setPaymentStatus(String.valueOf(OrderStatus.COMPLETED));
    return order;
  }

  @Override
  public Order confirmedOrder(Long id) throws OrderException {
    Order order = getOrderById(id);
    order.setOrderStatus(String.valueOf(OrderStatus.CONFIRMED));
    return orderRepository.save(order);
  }

  @Override
  public Order shippedOrder(Long id) throws OrderException {
    Order order = getOrderById(id);
    order.setOrderStatus(String.valueOf(OrderStatus.SHIPPED));
    return orderRepository.save(order);  }

  @Override
  public Order diliveredOrder(Long id) throws OrderException {
    Order order = getOrderById(id);
    order.setOrderStatus(String.valueOf(OrderStatus.DELIVERED));
    return orderRepository.save(order);  }

  @Override
  public Order canceledOrder(Long id) throws OrderException {
    Order order = getOrderById(id);
    order.setOrderStatus(String.valueOf(OrderStatus.CANCELED));
    return orderRepository.save(order);
  }

  @Override
  public List<Order> getAllOrder() throws OrderException {
    return orderRepository.findAll();
  }

  @Override
  public void deleteOrder(Long id) throws OrderException {
    Order order = getOrderById(id);
    orderRepository.delete(order);
  }
}
