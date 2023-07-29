package com.anhducdt.ecommerce_backend.services.impl;

import com.anhducdt.ecommerce_backend.dtos.resquests.ProductRequest;
import com.anhducdt.ecommerce_backend.exceptions.ProductException;
import com.anhducdt.ecommerce_backend.models.Category;
import com.anhducdt.ecommerce_backend.models.Product;
import com.anhducdt.ecommerce_backend.repositories.CategoryRepository;
import com.anhducdt.ecommerce_backend.repositories.ProductRepository;
import com.anhducdt.ecommerce_backend.services.IProductService;
import com.anhducdt.ecommerce_backend.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.util.List.of;

@Service
public class ProductService implements IProductService {

    private final ProductRepository productRepository;
    private final IUserService userService;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, IUserService userService, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.userService = userService;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Product createProduct(ProductRequest productRequest) {
        Category topLevel = categoryRepository.findByName(productRequest.getTopLevelCategory());

        if (topLevel==null) {
            Category topLevelCategory = new Category();
            topLevelCategory.setName(productRequest.getTopLevelCategory());
            topLevelCategory.setLevel(1);
            topLevel = categoryRepository.save(topLevelCategory);
        }
        Category secondLevel = categoryRepository.findByNameAndParent(productRequest.getSecondLevelCategory(), topLevel.getName());

        if (secondLevel==null) {
            Category secondLevelCategory = new Category();
            secondLevelCategory.setName(productRequest.getSecondLevelCategory());
            secondLevelCategory.setParentCategory(topLevel);
            secondLevelCategory.setLevel(2);
            secondLevel = categoryRepository.save(secondLevelCategory);
        }
        Category thirdLevel = categoryRepository.findByNameAndParent(productRequest.getThirdLevelCategory(), secondLevel.getName());

        if (thirdLevel==null) {
            Category thirdLevelCategory = new Category();
            thirdLevelCategory.setName(productRequest.getSecondLevelCategory());
            thirdLevelCategory.setParentCategory(topLevel);
            thirdLevelCategory.setLevel(2);
            thirdLevel = categoryRepository.save(thirdLevelCategory);
        }

        Product product = new Product();
        product.setTitle(productRequest.getTitle());
        product.setColor(productRequest.getColor());
        product.setDescription(productRequest.getDescription());
        product.setDiscountedPrice(productRequest.getDiscountedPrice());
        product.setDiscountPersent(productRequest.getDiscountPersent());
        product.setImageUrl(productRequest.getImageUrl());
        product.setBrand(productRequest.getBrand());
        product.setSize(productRequest.getSize());
        product.setCategory(thirdLevel);
        product.setDateCreate(LocalDateTime.now());

        return productRepository.save(product);
    }

    @Override
    public Product getProductById(Long id) throws ProductException {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            optionalProduct.get();
        }
       throw new ProductException("Product not found");
    }

    @Override
    public Product updateProduct(Long id, ProductRequest productRequest) throws ProductException {
        Product product = getProductById(id);
        if (productRequest.getQuantity() != 0)
            product.setQuantity(productRequest.getQuantity());
        return productRepository.save(product);
    }

    @Override
    public void deleteProductById(Long id) throws ProductException {
        Product product = getProductById(id);
        product.getSize().clear();
        productRepository.deleteById(id);
    }

    @Override
    public List<Product> findProductByCategory(Long id) throws ProductException {
        return null;
    }

    @Override
    public Page<Product> getProducts(String category, List<String> colors, List<String> sizes, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize) {
        Pageable pageable  = PageRequest.of(pageNumber, pageSize);
        List<Product> productList = productRepository.filterProduct(category, minPrice, maxPrice, minDiscount, sort);
        if(!colors.isEmpty()) {
            productList.stream().filter(p -> colors.stream().anyMatch(c -> c.equalsIgnoreCase(p.getColor()))).collect(Collectors.toList());
        }
        if (stock != null) {
            if(stock.equals("in_stock")) {
                productList = productList.stream().filter(p -> p.getQuantity()> 0).collect(Collectors.toList());
            } else if (stock.equals("out_of_stock")) {
                productList = productList.stream().filter(p -> p.getQuantity()< 1).collect(Collectors.toList());
            }
        }
        int startIndex = (int) pageable.getOffset();
        int endIndex = Math.min(startIndex + pageable.getPageSize(), productList.size());
        List<Product> pageContent = productList.subList(startIndex, endIndex);
        return new PageImpl<>(pageContent, pageable, productList.size());
    }
}
