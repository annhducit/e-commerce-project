package com.anhducdt.ecommerce_backend.services.impl;

import com.anhducdt.ecommerce_backend.configs.JwtProvider;
import com.anhducdt.ecommerce_backend.exceptions.UserException;
import com.anhducdt.ecommerce_backend.models.User;
import com.anhducdt.ecommerce_backend.repositories.UserRepository;
import com.anhducdt.ecommerce_backend.services.IUserService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    public UserService(UserRepository userRepository, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public User findUserById(Long id) throws UserException {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            optionalUser.get();
        }
        throw new UserException("User not found!");
    }

    @Override
    public User findUserByJwt(String jwt) throws UserException {
        String email = jwtProvider.getEmailFormToken(jwt);
        User user  = userRepository.findUserByEmail(email);
        if (user == null) {
            throw new UserException("User not found");
        }
        return user;
    }
}
