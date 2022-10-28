package com.example.demo.User;

import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface UserService {

    boolean addUser(User userdata) throws NoSuchAlgorithmException;

    User login(User user) throws NoSuchAlgorithmException;

    List<User> all();

}
