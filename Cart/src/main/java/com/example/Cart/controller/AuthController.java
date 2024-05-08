package com.example.Cart.controller;

import com.example.Cart.dto.AuthenticationRequest;
import com.example.Cart.dto.AuthenticationRespone;
import com.example.Cart.dto.SignupRequest;
import com.example.Cart.dto.UserDto;
import com.example.Cart.entity.User;
import com.example.Cart.repository.UserRepository;
import com.example.Cart.services.auth.AuthService;
import com.example.Cart.services.jwt.UserService;
import com.example.Cart.utils.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;

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
    @PostMapping("/login")
    public AuthenticationRespone createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws
            BadCredentialsException, DisabledException, UsernameNotFoundException{
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),
                    authenticationRequest.getPassword()));
        } catch (BadCredentialsException e){
            throw new BadCredentialsException(("Incorrect user name or password"));
        }
        final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authenticationRequest.getEmail());
        Optional<User> optionalUser = userRepository.findByEmail(userDetails.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        AuthenticationRespone authenticationRespone = new AuthenticationRespone();
        if (optionalUser.isPresent()){
            authenticationRespone.setJwt(jwt);
            authenticationRespone.setUserId(optionalUser.get().getId());
            authenticationRespone.setUserRole(optionalUser.get().getUserRole());
        }
        return authenticationRespone;
    }
}
