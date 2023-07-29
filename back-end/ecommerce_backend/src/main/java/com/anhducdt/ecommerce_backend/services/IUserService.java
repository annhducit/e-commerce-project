package com.anhducdt.ecommerce_backend.services;

import com.anhducdt.ecommerce_backend.exceptions.UserException;
import com.anhducdt.ecommerce_backend.models.User;
import org.springframework.stereotype.Component;

public interface IUserService {
    public User findUserById(Long id) throws UserException;
    public User findUserByJwt(String jwt) throws UserException;

}
