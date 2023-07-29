package com.anhducdt.ecommerce_backend.repositories;

import com.anhducdt.ecommerce_backend.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByName(String name);
    @Query("Select c from Category c where c.name=:name and c.parentCategory.name=:parentCategoryName")
    Category findByNameAndParent(@Param("name") String name, @Param("parentCategoryName") String parentCategoryName);

}
