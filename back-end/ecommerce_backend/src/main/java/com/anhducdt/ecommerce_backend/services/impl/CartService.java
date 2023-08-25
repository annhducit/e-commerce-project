package com.anhducdt.ecommerce_backend.services.impl;

import com.anhducdt.ecommerce_backend.dtos.resquests.AddItemRequest;
import com.anhducdt.ecommerce_backend.exceptions.ProductException;
import com.anhducdt.ecommerce_backend.models.Cart;
import com.anhducdt.ecommerce_backend.models.CartItem;
import com.anhducdt.ecommerce_backend.models.Product;
import com.anhducdt.ecommerce_backend.models.User;
import com.anhducdt.ecommerce_backend.repositories.CartItemRepository;
import com.anhducdt.ecommerce_backend.repositories.CartRepository;
import com.anhducdt.ecommerce_backend.services.ICartItemService;
import com.anhducdt.ecommerce_backend.services.ICartService;
import com.anhducdt.ecommerce_backend.services.IProductService;
import com.anhducdt.ecommerce_backend.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService implements ICartService {

  private final CartRepository cartRepository;
  private final ICartItemService cartItemService;
  private final IProductService productService;
  @Override
  public Cart createCart(User user) {
    Cart cart = new Cart();
    cart.setUser(user);
    return cartRepository.save(cart);
  }

  @Override
  public String addCartItem(Long userId, AddItemRequest addItemRequest) throws ProductException {
    Cart cart = cartRepository.findByUserId(userId);
    Product product = productService.getProductById(addItemRequest.getProductId());

    CartItem isPresent = cartItemService.isCartItemExist(cart, product, addItemRequest.getSize(), userId);
    if (isPresent == null) {
      CartItem cartItem = new CartItem();
      cartItem.setProduct(product);
      cartItem.setCart(cart);
      cartItem.setQuantity(addItemRequest.getQuantity());
      cartItem.setUserId(userId);
      int price = addItemRequest.getQuantity() * product.getDiscountedPrice();
      cartItem.setPrice(price);
      cartItem.setSize(addItemRequest.getSize());
      CartItem cartItemNew  = cartItemService.createCartItem(cartItem);
      cart.getCartItems().add(cartItemNew);
      return "Item add to cart success!";
    }
    return "Item already exist";
  }

  @Override
  public Cart findUserCart(Long userId) {
    Cart cart = cartRepository.findByUserId(userId);
    int totalPrice = 0;
    int totalDiscountPrice = 0;
    int totalItem = 0;
    for (CartItem cartItem : cart.getCartItems()) {
      totalPrice = totalPrice +  cartItem.getPrice();
      totalDiscountPrice  = totalDiscountPrice + cartItem.getDiscountedPrice();
      totalItem = totalItem + cartItem.getQuantity();
    }

    cart.setTotalPrice(totalPrice);
    cart.setTotalDiscountPrice(totalDiscountPrice);
    cart.setTotalItem(totalItem);
    cart.setDiscount(totalPrice - totalDiscountPrice);
    return cartRepository.save(cart);
  }
}
