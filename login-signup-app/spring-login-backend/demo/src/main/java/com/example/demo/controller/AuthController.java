package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // ✅ Register a new user
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        return ResponseEntity.ok(registeredUser); // Return full user object (including userId)
    }

    // ✅ Login API
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        User user = userService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());

        if (user != null) {
            // ✅ Return full user details including id
            return ResponseEntity.ok(new HashMap<String, String>() {{
                put("id", user.getId());   // Include user ID
                put("username", user.getUsername());
                put("role", user.getRole());
            }});
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }


}
