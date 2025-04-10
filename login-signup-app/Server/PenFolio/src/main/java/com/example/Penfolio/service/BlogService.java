package com.example.Penfolio.service;

import com.example.Penfolio.entity.Blog;
import com.example.Penfolio.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    // Create a new blog post
    public Blog createBlog(Blog blog) {
        return blogRepository.save(blog);
    }

    // Get all blogs
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    // Get a blog by ID
    public Optional<Blog> getBlogById(String id) {
        return blogRepository.findById(id);
    }

    // Get blogs by userId (instead of username)
    public List<Blog> getBlogsByUserId(String userId) {
        return blogRepository.findByUserId(userId);
    }

    // Update a blog (only if the userId matches)
    public Blog updateBlog(String id, Blog updatedBlog, String userId) {
        Optional<Blog> existingBlog = blogRepository.findById(id);

        if (existingBlog.isPresent() && existingBlog.get().getUserId().equals(userId)) {
            updatedBlog.setId(id);
            return blogRepository.save(updatedBlog);
        }
        return null;
    }

    // Delete a blog (only if the userId matches)
    public boolean deleteBlog(String id, String userId) {
        Optional<Blog> existingBlog = blogRepository.findById(id);
        if (existingBlog.isPresent() && existingBlog.get().getUserId().equals(userId)) {
            blogRepository.deleteById(id);
            return true;
        }
        return false;
    }
    public List<Blog> getBlogsByUsername(String username) {
        return blogRepository.findByUsername(username);
    }

}
