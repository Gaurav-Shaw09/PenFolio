package com.example.demo.controller;

import com.example.demo.entity.UserProfile;
import com.example.demo.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:5173") // Vite's default URL
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;
    @GetMapping("/{username}")
    public ResponseEntity<?> getProfile(@PathVariable String username) {
        System.out.println("Fetching profile for username: " + username);
        Optional<UserProfile> userProfile = userProfileService.getUserProfile(username);

        if (userProfile.isPresent()) {
            return ResponseEntity.ok(userProfile.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{username}")
    public ResponseEntity<?> updateProfile(@PathVariable String username, @RequestBody UserProfile profile) {
        if (!username.equals(profile.getUsername())) {
            return ResponseEntity.badRequest().body("Username in the path and request body must match.");
        }
        UserProfile updatedProfile = userProfileService.updateUserProfile(username, profile.getProfilePicture(), profile.getDescription());
        return ResponseEntity.ok(updatedProfile);
    }
}
