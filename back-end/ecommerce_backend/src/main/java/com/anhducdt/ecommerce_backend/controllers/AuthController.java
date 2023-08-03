package com.anhducdt.ecommerce_backend.controllers;

import com.anhducdt.ecommerce_backend.configs.JwtProvider;
import com.anhducdt.ecommerce_backend.dtos.responses.AuthResponse;
import com.anhducdt.ecommerce_backend.dtos.resquests.AuthRequest;
import com.anhducdt.ecommerce_backend.exceptions.UserException;
import com.anhducdt.ecommerce_backend.models.Cart;
import com.anhducdt.ecommerce_backend.models.User;
import com.anhducdt.ecommerce_backend.repositories.UserRepository;
import com.anhducdt.ecommerce_backend.services.impl.CartService;
import com.anhducdt.ecommerce_backend.services.impl.CustomerUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CachingUserDetailsService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final CustomerUserService customerUserService;
    private final CartService cartService;

    public AuthController(UserRepository userRepository, JwtProvider jwtProvider, PasswordEncoder passwordEncoder, CustomerUserService customerUserService, CartService cartService) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
        this.passwordEncoder = passwordEncoder;
        this.customerUserService = customerUserService;
        this.cartService = cartService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {
        String email = user.getEmail();
        String password = user.getPassword();
        String firstString = user.getFistName();
        String lastString = user.getLastName();
        User isEmailExits = userRepository.findUserByEmail(email);
        if (isEmailExits != null) {
            throw new UserException("This Email is already use with another account");
        }
        User createUser = new User();
        createUser.setEmail(email);
        createUser.setPassword(passwordEncoder.encode(password));
        createUser.setFistName(firstString);
        createUser.setLastName(lastString);

        User newUser = userRepository.save(createUser);
        Cart cart = cartService.createCart(newUser);
        Authentication  authentication = new UsernamePasswordAuthenticationToken(newUser.getEmail(), newUser.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token =jwtProvider.generatorToken(authentication);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Signup Success");
        return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
    }
@PostMapping("/signin")
    public ResponseEntity<AuthResponse> loginUserHandle(@RequestBody AuthRequest authRequest) {
        String username = authRequest.getEmail();
        String password = authRequest.getPassword();
        Authentication authentication = authenticate(username, password);

        String token =jwtProvider.generatorToken(authentication);
    AuthResponse authResponse = new AuthResponse();
    authResponse.setJwt(token);
    authResponse.setMessage("Signin Success");
    return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = customerUserService.loadUserByUsername(username);
        if (userDetails == null) {
            throw new BadCredentialsException("Invalid Username");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid Password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
