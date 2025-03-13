package com.example.demo.service;

import com.example.demo.entity.UserProfile;
import com.example.demo.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository userProfileRepository;

    public Optional<UserProfile> getUserProfile(String username) {
        return userProfileRepository.findByUsername(username);
    }

    public UserProfile updateUserProfile(String username, String profilePicture, String description) {
        Optional<UserProfile> optionalProfile = userProfileRepository.findByUsername(username);

        UserProfile userProfile;
        if (optionalProfile.isPresent()) {
            userProfile = optionalProfile.get();
            userProfile.setProfilePicture(profilePicture);
            userProfile.setDescription(description);
        } else {
            userProfile = new UserProfile(username, profilePicture, description);
        }

        return userProfileRepository.save(userProfile);
    }
}
