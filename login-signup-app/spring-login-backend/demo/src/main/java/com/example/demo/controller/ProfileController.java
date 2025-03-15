package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.repository.ProfileRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

    @Autowired
    private UserRepository userRepository;

    // Fetch profile by username

    @GetMapping("/{user_id}")
    public ResponseEntity<?> getProfile(@PathVariable String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        return ResponseEntity.ok(user);
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

    // Serve the profile picture as a byte array
    @GetMapping("/{username}/profile-picture")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable String username) {
        Optional<User> optionalUser = profileService.findByUsername(username);
        if (optionalUser.isPresent() && optionalUser.get().getProfilePicture() != null) {
            User user = optionalUser.get();
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG) // Adjust the media type based on the image format
                    .body(user.getProfilePicture().getData());
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}