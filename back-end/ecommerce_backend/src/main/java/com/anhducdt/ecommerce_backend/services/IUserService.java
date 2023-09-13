package com.anhducdt.ecommerce_backend.services;

import com.anhducdt.ecommerce_backend.dtos.resquests.UpdateUserInfoRequest;
import com.anhducdt.ecommerce_backend.exceptions.UserException;
import com.anhducdt.ecommerce_backend.models.User;
import org.springframework.stereotype.Component;

public interface IUserService {
    User findUserById(Long id) throws UserException;
    User findUserByJwt(String jwt) throws UserException;
    User updateUserInfo(Long id, UpdateUserInfoRequest updateUserInfoRequest) throws UserException;


}
