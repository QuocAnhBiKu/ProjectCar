package com.example.Cart.dto;

import com.example.Cart.enums.UserRole;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private UserRole userRole;
}
