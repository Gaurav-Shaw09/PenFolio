package com.example.Penfolio.service;

import com.example.Penfolio.entity.Blog;
import com.example.Penfolio.entity.User;
import com.example.Penfolio.repository.BlogRepository;
import com.example.Penfolio.repository.ProfileRepository;
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

    @Autowired
    private BlogRepository blogRepository;

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
    public Blog updateBlog(String blogId, Blog updatedBlog) {
        Optional<Blog> existingBlog = blogRepository.findById(blogId);
        if (existingBlog.isPresent()) {
            Blog blog = existingBlog.get();
            blog.setTitle(updatedBlog.getTitle());
            blog.setContent(updatedBlog.getContent());
            blog.setImagePath(updatedBlog.getImagePath()); // ✅ Ensure image can be updated
            return blogRepository.save(blog);
        } else {
            throw new RuntimeException("Blog not found");
        }
    }

    // ✅ Delete a blog
    public void deleteBlog(String blogId) {
        Optional<Blog> blog = blogRepository.findById(blogId);
        if (blog.isPresent()) {
            blogRepository.deleteById(blogId);
        } else {
            throw new RuntimeException("Blog not found");
        }
    }
}