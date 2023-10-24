package com.anhducdt.ecommerce_backend.dtos.resquests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserInfoRequest {
    private String firstName;
    private String lastName;
    private String nation;
    private String phoneNumber;
}
