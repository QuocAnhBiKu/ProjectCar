package com.example.Car.dto;

import com.example.Car.enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationRespone {
    private String jwt;
    private UserRole userRole;
    private Long userId;
}
