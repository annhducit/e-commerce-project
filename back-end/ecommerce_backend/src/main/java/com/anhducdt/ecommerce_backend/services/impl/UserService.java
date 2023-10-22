package com.anhducdt.ecommerce_backend.services.impl;

import com.anhducdt.ecommerce_backend.configs.UserAuthProvider;
import com.anhducdt.ecommerce_backend.dtos.responses.PaginationResponse;
import com.anhducdt.ecommerce_backend.dtos.resquests.UpdateUserInfoRequest;
import com.anhducdt.ecommerce_backend.exceptions.UserException;
import com.anhducdt.ecommerce_backend.models.User;
import com.anhducdt.ecommerce_backend.repositories.UserRepository;
import com.anhducdt.ecommerce_backend.services.IUserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final UserAuthProvider userAuthProvider;

    public UserService(UserRepository userRepository, UserAuthProvider jwtProvider) {
        this.userRepository = userRepository;
        this.userAuthProvider = jwtProvider;
    }

    @Override
    public User findUserById(Long id) throws UserException {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        }
        throw new UserException("User not found!");
    }

    @Override
    public User findUserByJwt(String jwt) throws UserException {
        String email = userAuthProvider.getEmailFormToken(jwt);
        User user  = userRepository.findUserByEmail(email);
        if (user == null) {
            throw new UserException("User not found");
        }
        return user;
    }

    @Override
    public User updateUserInfo(Long id, UpdateUserInfoRequest updateUserInfoRequest) throws UserException {
        User user = findUserById(id);
        user.setFirstName(updateUserInfoRequest.getFirstName());
        user.setLastName(updateUserInfoRequest.getLastName());
        user.setPhoneNumber(updateUserInfoRequest.getPhoneNumber());
        user.setNation(updateUserInfoRequest.getNation());
        return userRepository.save(user);
    }

    @Override
    public PaginationResponse findAllAccounts(Integer page, Integer pageSize) {
        Pageable pageable = PageRequest.of(page - 1, pageSize);
        Page<User> userPage = userRepository.findAll(pageable);

        List<User> userList = userPage.getContent();

        return PaginationResponse.builder()
            .totalElements(userPage.getTotalElements())
            .totalPages(userPage.getTotalPages())
            .currentPage(page)
            .hasNextPage(userPage.hasNext())
            .data(userList)
            .build();
    }



}
