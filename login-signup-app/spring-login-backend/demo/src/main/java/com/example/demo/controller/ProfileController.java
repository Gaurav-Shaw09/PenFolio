package com.example.demo.controller;

import com.example.demo.entity.Blog;
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
    @GetMapping("/{username}")
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
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(user.getProfilePicture().getData());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Follow a user
    @PostMapping("/{username}/follow")
    public ResponseEntity<?> followUser(
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

            if (targetUser.getId().equals(followerUser.getId())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Cannot follow yourself");
            }

            targetUser.addFollower(followerUser.getId());
            followerUser.addFollowing(targetUser.getId());

            userRepository.save(targetUser);
            userRepository.save(followerUser);

            return ResponseEntity.ok(targetUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error following user: " + e.getMessage());
        }
    }

    // Unfollow a user
    @PostMapping("/{username}/unfollow")
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

    // Update blog
    @PutMapping("/blogs/{blogId}")
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
    @DeleteMapping("/blogs/{blogId}")
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