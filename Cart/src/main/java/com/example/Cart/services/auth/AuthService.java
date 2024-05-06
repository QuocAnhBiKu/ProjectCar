package com.example.Cart.services.auth;

import com.example.Cart.dto.SignupRequest;
import com.example.Cart.dto.UserDto;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {

    UserDto createUser(SignupRequest signupRequest);

    boolean hasUserWithEmail(String email);
}
