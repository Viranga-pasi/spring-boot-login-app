package com.example.demo.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query(value = "SELECT * FROM User WHERE user_name=?1", nativeQuery = true)
    User CheckUserName(String user_name);

    @Query(value = "SELECT * FROM User WHERE user_name=?1 AND password=?2", nativeQuery = true)
    User CheckUser(String user_name, String hashedPW);
}
