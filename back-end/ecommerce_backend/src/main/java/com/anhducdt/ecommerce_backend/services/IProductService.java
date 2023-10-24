package com.anhducdt.ecommerce_backend.services;

import com.anhducdt.ecommerce_backend.dtos.responses.PaginationResponse;
import com.anhducdt.ecommerce_backend.dtos.resquests.ProductRequest;
import com.anhducdt.ecommerce_backend.exceptions.ProductException;
import com.anhducdt.ecommerce_backend.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface IProductService {
    Product createProduct(ProductRequest productRequest);
    List<Product> createProducts(List<ProductRequest> productRequests);
    Product getProductById(Long id) throws ProductException;
    Product updateProduct(Long id, ProductRequest productRequest) throws ProductException;
    void deleteProductById(Long id) throws ProductException;
    List<Product> findProductByCategory(Long id) throws ProductException;
    Page<Product> getProducts(String category, List<String> colors, List<String> sizes, Integer minPrice, Integer maxPrice
    ,Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize);
    List<Product> searchProductByKeyWord(String keyword);
    List<Product> getProductsByCategory(String category);
    List<Product> findAllProducts();
    List<Product> sortProductByDiscountedPrice(String sortBy);
}
