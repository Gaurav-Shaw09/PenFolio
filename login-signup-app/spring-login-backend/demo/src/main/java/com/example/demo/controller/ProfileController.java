package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.demo.service.

@RestController
@RequestMapping("/api/user")
public class UserProfileController {


    @Autowired
    private UserService userService;

    // Update profile
    @PutMapping("/{username}")
    public ResponseEntity<User> updateProfile(
            @PathVariable String username,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) MultipartFile profilePicture) {
        try {
            User updatedUser = userProfileService.updateProfile(username, description, profilePicture);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}