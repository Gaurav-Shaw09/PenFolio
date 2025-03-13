package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Service
public class UserProfileService {

    @Autowired
    private UserRepository userRepository;

    // Directory to store uploaded profile pictures
    private final Path rootLocation = Paths.get("uploads");

    // Update profile description and picture
    public User updateProfile(String username, String description, MultipartFile profilePicture) throws IOException {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setDescription(description);

            // Save the profile picture if provided
            if (profilePicture != null && !profilePicture.isEmpty()) {
                String fileName = username + "_" + System.currentTimeMillis() + "_" + profilePicture.getOriginalFilename();
                Files.copy(profilePicture.getInputStream(), this.rootLocation.resolve(fileName));
                user.setProfilePicture(fileName); // Save the file path in the database
            }

            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found for username: " + username);
        }
    }

    // Initialize the upload directory
    public void init() {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize upload directory!");
        }
    }
}