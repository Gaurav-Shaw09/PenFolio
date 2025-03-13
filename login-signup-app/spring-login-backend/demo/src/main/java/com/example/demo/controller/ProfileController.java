package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from this origin
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    // Fetch profile by username
    @GetMapping("/{username}")
    public ResponseEntity<User> getProfile(@PathVariable String username) {
        Optional<User> profile = profileService.findByUsername(username);
        return profile.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update profile
    @PutMapping("/{username}")
    public ResponseEntity<User> updateProfile(
            @PathVariable String username,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) MultipartFile profilePicture) {
        try {
            User updatedUser = profileService.updateProfile(username, description, profilePicture);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
