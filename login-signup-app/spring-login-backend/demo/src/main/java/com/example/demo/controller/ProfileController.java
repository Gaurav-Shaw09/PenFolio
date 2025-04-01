package com.example.demo.controller;

import com.example.demo.entity.Blog;
import com.example.demo.entity.Notification;
import com.example.demo.entity.User;
import com.example.demo.repository.NotificationRepository;
import com.example.demo.repository.ProfileRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from this origin
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private UserRepository userRepository;

    // Search users by username
    @GetMapping("/users/search")
    public ResponseEntity<?> searchUsers(@RequestParam("query") String query) {
        try {
            // Search for users whose username contains the query (case-insensitive)
            Optional<User> users = userRepository.findByUsername(query);
            if (users.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No users found matching the query: " + query);
            }

            // Convert to DTO to return only necessary fields
            List<UserDTO> userDTOs = users.stream()
                    .map(user -> new UserDTO(
                            user.getId(),
                            user.getUsername(),
                            user.getDescription()
                    ))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(userDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error searching users: " + e.getMessage());
        }
    }

    // Fetch profile by username
    @GetMapping("/profile/{username}")
    public ResponseEntity<?> getProfile(@PathVariable String username) {
        try {
            Optional<User> profile = profileService.findByUsername(username);
            if (profile.isPresent()) {
                return ResponseEntity.ok(profile.get());
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching profile: " + e.getMessage());
        }
    }

    // Update profile
    @PutMapping("/profile/{username}")
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
    @GetMapping("/profile/{username}/profile-picture")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable String username) {
        Optional<User> optionalUser = profileService.findByUsername(username);
        if (optionalUser.isPresent() && optionalUser.get().getProfilePicture() != null) {
            User user = optionalUser.get();
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(user.getProfilePicture().getData());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @Autowired
    private NotificationRepository notificationRepository;
    // Follow a user
    @PostMapping("/profile/{username}/follow")
    public ResponseEntity<?> followUser(
            @PathVariable String username,
            @RequestBody FollowRequest followRequest) {
        try AscendingKey ascendingKey = new AscendingKey();
        try {
            Optional<User> targetUserOpt = profileService.findByUsername(username);
            Optional<User> followerUserOpt = userRepository.findById(followRequest.getUserId());

            if (!targetUserOpt.isPresent() || !followerUserOpt.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User not found");
            }

            User targetUser = targetUserOpt.get();
            User followerUser = followerUserOpt.get();

            if (targetUser.getId().equals(followerUser.getId())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Cannot follow yourself");
            }

            // Check if the follower is already following the target user
            if (targetUser.getFollowers().contains(followerUser.getId())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Already following this user");
            }

            // Add follower and following relationships
            targetUser.addFollower(followerUser.getId());
            followerUser.addFollowing(targetUser.getId());

            // Create a notification for the target user
            Notification notification = new Notification(
                    targetUser.getId(), // User receiving the notification
                    "FOLLOW",
                    followerUser.getUsername() + " followed you"
            );
            notification.setFromUserId(followerUser.getId()); // Set the user who triggered the notification
            notificationRepository.save(notification);

            // Save the updated users
            userRepository.save(targetUser);
            userRepository.save(followerUser);

            return ResponseEntity.ok(targetUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error following user: " + e.getMessage());
        }
    }

    // Unfollow a user
    @PostMapping("/profile/{username}/unfollow")
    public ResponseEntity<?> unfollowUser(
            @PathVariable String username,
            @RequestBody FollowRequest followRequest) {
        try {
            Optional<User> targetUserOpt = profileService.findByUsername(username);
            Optional<User> followerUserOpt = userRepository.findById(followRequest.getUserId());

            if (!targetUserOpt.isPresent() || !followerUserOpt.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User not found");
            }

            User targetUser = targetUserOpt.get();
            User followerUser = followerUserOpt.get();

            targetUser.removeFollower(followerUser.getId());
            followerUser.removeFollowing(targetUser.getId());

            userRepository.save(targetUser);
            userRepository.save(followerUser);

            return ResponseEntity.ok(targetUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error unfollowing user: " + e.getMessage());
        }
    }

    // Get followers list with user details
    @GetMapping("/profile/{username}/followers")
    public ResponseEntity<?> getFollowers(@PathVariable String username) {
        try {
            Optional<User> userOpt = profileService.findByUsername(username);
            if (!userOpt.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User not found");
            }

            User user = userOpt.get();
            List<UserDTO> followers = userRepository.findAllById(user.getFollowers())
                    .stream()
                    .map(follower -> new UserDTO(
                            follower.getId(),
                            follower.getUsername(),
                            follower.getDescription()
                    ))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(followers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching followers: " + e.getMessage());
        }
    }

    // Get following list with user details
    @GetMapping("/profile/{username}/following")
    public ResponseEntity<?> getFollowing(@PathVariable String username) {
        try {
            Optional<User> userOpt = profileService.findByUsername(username);
            if (!userOpt.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("User not found");
            }

            User user = userOpt.get();
            List<UserDTO> following = userRepository.findAllById(user.getFollowing())
                    .stream()
                    .map(followingUser -> new UserDTO(
                            followingUser.getId(),
                            followingUser.getUsername(),
                            followingUser.getDescription()
                    ))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(following);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching following: " + e.getMessage());
        }
    }

    // Update blog
    @PutMapping("/profile/blogs/{blogId}")
    public ResponseEntity<?> updateBlog(
            @PathVariable String blogId,
            @RequestBody Blog updatedBlog) {
        try {
            Blog blog = profileService.updateBlog(blogId, updatedBlog);
            return ResponseEntity.ok(blog);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error updating blog: " + e.getMessage());
        }
    }

    // Delete a blog
    @DeleteMapping("/profile/blogs/{blogId}")
    public ResponseEntity<?> deleteBlog(@PathVariable String blogId) {
        try {
            profileService.deleteBlog(blogId);
            return ResponseEntity.ok("Blog deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting blog: " + e.getMessage());
        }
    }
}

// Simple request class for follow/unfollow operations
class FollowRequest {
    private String userId;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}

// DTO class to return limited user information
class UserDTO {
    private String id;
    private String username;
    private String description;

    public UserDTO(String id, String username, String description) {
        this.id = id;
        this.username = username;
        this.description = description;
    }

    // Getters
    public String getId() { return id; }
    public String getUsername() { return username; }
    public String getDescription() { return description; }

    // Setters
    public void setId(String id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setDescription(String description) { this.description = description; }
}