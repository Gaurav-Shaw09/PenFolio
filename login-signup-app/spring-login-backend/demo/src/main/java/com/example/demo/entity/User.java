package com.example.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.bson.types.Binary;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
public class User {
    @Id
    private String id; // Unique user ID
    private String username;
    private String password;
    private String email;
    private String role; // "USER" or "ADMIN"
    private Binary profilePicture;
    private String description;
    private List<String> followers = new ArrayList<>(); // List of user IDs who follow this user
    private List<String> following = new ArrayList<>(); // List of user IDs this user follows

    // Constructors
    public User() {}

    public User(String username, String password, String email, String role,
                Binary profilePicture, String description) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.profilePicture = profilePicture;
        this.description = description;
        this.followers = new ArrayList<>();
        this.following = new ArrayList<>();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public Binary getProfilePicture() { return profilePicture; }
    public void setProfilePicture(Binary profilePicture) { this.profilePicture = profilePicture; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getFollowers() { return followers; }
    public void setFollowers(List<String> followers) { this.followers = followers; }

    public List<String> getFollowing() { return following; }
    public void setFollowing(List<String> following) { this.following = following; }

    // Helper methods for follow functionality
    public void addFollower(String userId) {
        if (!followers.contains(userId)) {
            followers.add(userId);
        }
    }

    public void removeFollower(String userId) {
        followers.remove(userId);
    }

    public void addFollowing(String userId) {
        if (!following.contains(userId)) {
            following.add(userId);
        }
    }

    public void removeFollowing(String userId) {
        following.remove(userId);
    }
}