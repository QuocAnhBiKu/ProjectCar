package com.example.Cart.controller;

import com.example.Cart.dto.SignupRequest;
import com.example.Cart.dto.UserDto;
import com.example.Cart.services.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody SignupRequest signupRequest) {
        if (authService.hasUserWithEmail(signupRequest.getEmail())){
            return new ResponseEntity<>("User already exist with this email",HttpStatus.NOT_ACCEPTABLE);
        }
        UserDto createUserDto = authService.createUser(signupRequest);
        if (createUserDto == null) {
            return new ResponseEntity<>("User not created, please try again later", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(createUserDto, HttpStatus.CREATED);
    }
}
