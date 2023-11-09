package com.anhducdt.ecommerce_backend.dtos.resquests;

import com.anhducdt.ecommerce_backend.models.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
@Getter
@Setter
public class ProductRequest {
    private String title;
    private String description;
    private int price;
    private int discountedPrice;
    private int discountPersent;
    private int quantity;
    private String brand;
    private String color;
    private Set<Size> size = new HashSet<>();
    private String imageUrl;
    private String topLevelCategory;
    private String secondLevelCategory;
    private String thirdLevelCategory;
}
