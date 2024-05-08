package com.example.Cart.dto;

import com.example.Cart.enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationRespone {
    private String jwt;
    private UserRole userRole;
    private Long userId;
}
