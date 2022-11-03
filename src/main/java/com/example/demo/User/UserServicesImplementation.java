package com.example.demo.User;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServicesImplementation implements UserService {
    @Autowired
    private UserRepository repo;

    @Override
    public boolean registerUser(User userdata) throws NoSuchAlgorithmException {
        if (repo.CheckUserName(userdata.getUser_name()) == null) {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] pwdDigest = md.digest(userdata.getPassword().getBytes());

            BigInteger hashed = new BigInteger(1, pwdDigest);
            String hashedPW = hashed.toString(16);

            userdata.setPassword(hashedPW);

            repo.save(userdata);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public User loginUser(User user) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] pwdDigest = md.digest(user.getPassword().getBytes());

        BigInteger hashed = new BigInteger(1, pwdDigest);
        String hashedPW = hashed.toString(16);

        User logged_user = repo.CheckUser(user.getUser_name(), hashedPW);

        if (logged_user != null) {

            return logged_user;
        } else {
            return null;
        }

    }

    @Override
    public List<User> getAll() {
        return repo.findAll();
    }

}
