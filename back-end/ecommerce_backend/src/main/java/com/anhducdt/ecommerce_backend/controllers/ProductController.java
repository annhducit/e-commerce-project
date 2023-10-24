package com.anhducdt.ecommerce_backend.controllers;

import com.anhducdt.ecommerce_backend.dtos.responses.PaginationResponse;
import com.anhducdt.ecommerce_backend.dtos.resquests.ProductRequest;
import com.anhducdt.ecommerce_backend.exceptions.ProductException;
import com.anhducdt.ecommerce_backend.models.Product;
import com.anhducdt.ecommerce_backend.services.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

  @PostMapping("/products")
    public ResponseEntity<List<Product>> createProducts(@RequestBody List<ProductRequest> productRequest) {
      List<Product> product = productService.createProducts(productRequest);
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

  @GetMapping("/category")
  public ResponseEntity<List<Product>> getProductByCategory(@RequestParam String category) {
    List<Product> productList = productService.getProductsByCategory(category);
    return new ResponseEntity<>(productList, HttpStatus.OK);
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

  @GetMapping("/all")
  public List<Product> getAllProducts() {
    return productService.findAllProducts();
  }

  @GetMapping("/search")
  public ResponseEntity<List<Product>> searchProductByKeyword(@RequestParam("keyword") String keyword) {
      List<Product> productList = productService.searchProductByKeyWord(keyword);
      return new ResponseEntity<>(productList, HttpStatus.OK);
  }

  @GetMapping("/sortByPrice")
  public ResponseEntity<List<Product>> sortProductByDiscountedPrice(@RequestParam("sortBy") String sort) {
    List<Product> productList = productService.sortProductByDiscountedPrice(sort);
    return new ResponseEntity<>(productList, HttpStatus.OK);
  }

}
