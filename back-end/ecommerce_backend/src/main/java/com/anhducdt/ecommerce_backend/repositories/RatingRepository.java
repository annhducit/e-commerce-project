package com.anhducdt.ecommerce_backend.repositories;

import com.anhducdt.ecommerce_backend.models.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
  @Query("SELECT R FROM Rating R WHERE R.product.id =: productId")
  List<Rating> getAllProductRating(@Param("productId") Long productId);
}
