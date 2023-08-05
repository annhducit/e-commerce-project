package com.anhducdt.ecommerce_backend.controllers;

import com.anhducdt.ecommerce_backend.dtos.resquests.ProductRequest;
import com.anhducdt.ecommerce_backend.exceptions.ProductException;
import com.anhducdt.ecommerce_backend.models.Product;
import com.anhducdt.ecommerce_backend.services.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

  private final IProductService productService;

  @PostMapping
  public ResponseEntity<Product> createProduct(@RequestBody ProductRequest productRequest) {
    Product product = productService.createProduct(productRequest);
    return new ResponseEntity<>(product, HttpStatus.CREATED);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Product> getProductById(@PathVariable Long id) {
    try {
      Product product = productService.getProductById(id);
      return new ResponseEntity<>(product, HttpStatus.OK);
    } catch (ProductException e) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody ProductRequest productRequest) {
    try {
      Product updatedProduct = productService.updateProduct(id, productRequest);
      return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    } catch (ProductException e) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteProductById(@PathVariable Long id) {
    try {
      productService.deleteProductById(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (ProductException e) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @GetMapping
  public ResponseEntity<Page<Product>> getProducts(@RequestParam(required = false) String category,
                                                   @RequestParam(required = false) List<String> colors,
                                                   @RequestParam(required = false) List<String> sizes,
                                                   @RequestParam(required = false) Integer minPrice,
                                                   @RequestParam(required = false) Integer maxPrice,
                                                   @RequestParam(required = false) Integer minDiscount,
                                                   @RequestParam(required = false) String sort,
                                                   @RequestParam(required = false) String stock,
                                                   @RequestParam(defaultValue = "0") Integer pageNumber,
                                                   @RequestParam(defaultValue = "10") Integer pageSize) {
    Page<Product> products = productService.getProducts(category, colors, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize);
    return new ResponseEntity<>(products, HttpStatus.OK);
  }
}