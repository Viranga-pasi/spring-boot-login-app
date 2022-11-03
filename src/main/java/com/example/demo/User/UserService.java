package com.example.demo.User;

import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface UserService {
    boolean registerUser(User userdata) throws NoSuchAlgorithmException;

    User loginUser(User user) throws NoSuchAlgorithmException;

    List<User> getAll();
}
