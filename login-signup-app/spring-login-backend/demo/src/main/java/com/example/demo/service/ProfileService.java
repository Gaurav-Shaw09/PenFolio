package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.bson.types.Binary; // Import Binary type for storing image data

import java.io.IOException;
import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    // Update profile description and picture
    public User updateProfile(String username, String description, MultipartFile profilePicture) throws IOException {
        Optional<User> optionalUser = profileRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setDescription(description);

            // Save the profile picture as binary data
            if (profilePicture != null && !profilePicture.isEmpty()) {
                user.setProfilePicture(new Binary(profilePicture.getBytes())); // Convert file to binary
            }

            return profileRepository.save(user);
        } else {
            throw new RuntimeException("User not found for username: " + username);
        }
    }

    // Fetch profile by username
    public Optional<User> findByUsername(String username) {
        return profileRepository.findByUsername(username);
    }
}