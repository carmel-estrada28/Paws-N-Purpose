package com.kinora.paws_n_purpose_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller{
    @GetMapping("/")
    public String home() {
        return "Welcome";
    }

    @GetMapping("/admin")
    public String admin() {
        return "Welcome to the admin page";
    }
}