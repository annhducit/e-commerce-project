package com.anhducdt.ecommerce_backend.dtos.responses;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Builder
public class PaginationResponse<T> {
    private Long totalElements;
    private Integer totalPages;
    private Integer currentPage;
    private Boolean hasNextPage;
    private T data;
}