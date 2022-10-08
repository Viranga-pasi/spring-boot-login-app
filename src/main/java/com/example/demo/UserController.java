package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

    @GetMapping("")
    public String ViewHomePage() {
        return "index";
    }

    @GetMapping("/register")
    public String showSignupForm(Model model) {
        return "Signup form";
    }

}
