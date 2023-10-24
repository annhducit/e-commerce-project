package com.anhducdt.ecommerce_backend.dtos.responses;

import com.anhducdt.ecommerce_backend.models.enums.ERole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class AuthResponse {
    private String jwt;
    private String message;
    private ERole ERole;
}
