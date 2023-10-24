package com.anhducdt.ecommerce_backend.repositories;

import com.anhducdt.ecommerce_backend.dtos.responses.PaginationResponse;
import com.anhducdt.ecommerce_backend.models.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p " +
            "WHERE (p.category.name = :category OR :category = '') " +
            "AND ((:minPrice IS NULL AND :maxPrice IS NULL) OR (p.discountedPrice BETWEEN :minPrice AND :maxPrice)) " +
            "AND (:minDiscount IS NULL OR p.discountPersent >= :minDiscount) " +
            "ORDER BY " +
            "CASE WHEN :sort = 'price_low' THEN p.discountedPrice END ASC, " +
            "CASE WHEN :sort = 'price_high' THEN p.discountedPrice END DESC")
    List<Product> filterProduct(@Param("category") String category,
                                       @Param("minPrice") Integer minPrice,
                                       @Param("maxPrice") Integer maxPrice,
                                       @Param("minDiscount") Integer minDiscount,
                                       @Param("sort") String sort);

    @Query("SELECT p FROM Product p WHERE p.title LIKE %:keyword% OR p.brand LIKE %:keyword%")
    List<Product> searchProductByKeyword(@Param("keyword") String keyword);
    @Query("SELECT p FROM Product p WHERE p.category.name = :category")
    List<Product> getProductByCategory(@Param("category") String category);
    @Query("SELECT p FROM Product p " +
        "ORDER BY " +
        "CASE WHEN :sort = 'price_low' THEN p.discountedPrice END ASC, " +
        "CASE WHEN :sort = 'price_high' THEN p.discountedPrice END DESC")
    List<Product> sortProductByDiscountedPrice(@Param("sort") String sort);


}
