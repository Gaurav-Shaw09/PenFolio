package com.example.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users") // Same collection name as User
public class UserProfile {
    @Id
    private String id;
    private String username;
    private String profilePicture;
    private String description;

    public UserProfile() {}

    public UserProfile(String username, String profilePicture, String description) {
        this.username = username;
        this.profilePicture = profilePicture;
        this.description = description;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getProfilePicture() { return profilePicture; }
    public void setProfilePicture(String profilePicture) { this.profilePicture = profilePicture; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
