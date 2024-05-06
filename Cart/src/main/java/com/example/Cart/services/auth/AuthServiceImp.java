package com.example.Cart.services.auth;

import com.example.Cart.dto.SignupRequest;
import com.example.Cart.dto.UserDto;
import com.example.Cart.entity.User;
import com.example.Cart.enums.UserRole;
import com.example.Cart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImp implements AuthService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDto createUser(SignupRequest signupRequest) {
        User user = new User();
        user.setName(signupRequest.getName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(signupRequest.getPassword());
        user.setUserRole(UserRole.USER);

        User createUser = userRepository.save(user);
        UserDto userDto = new UserDto();
        userDto.setId(createUser.getId());
        return userDto;
    }

    @Override
    public boolean hasUserWithEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
}
