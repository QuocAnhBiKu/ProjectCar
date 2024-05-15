package com.example.Car.services.auth;

import com.example.Car.dto.SignupRequest;
import com.example.Car.dto.UserDto;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {

    UserDto createUser(SignupRequest signupRequest);

    boolean hasUserWithEmail(String email);
}
