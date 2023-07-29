package com.anhducdt.ecommerce_backend.dtos.resquests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class AuthRequest {
    private String email;
    private String password;
}
