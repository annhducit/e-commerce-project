package com.anhducdt.ecommerce_backend.repositories;

import com.anhducdt.ecommerce_backend.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
  @Query("SELECT REVIEW FROM Review REVIEW WHERE REVIEW.product.id =: prductId")
  List<Review> getAllReviewProduct(@Param("productId") Long productId);
}
