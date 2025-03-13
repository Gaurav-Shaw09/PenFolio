package com.example.demo.service;

import com.example.demo.entity.Blog;
import com.example.demo.repository.BlogRepository;
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

    // Get blogs by author
    public List<Blog> getBlogsByAuthor(String author) {
        return blogRepository.findByAuthor(author);
    }

    // Update a blog
    public Blog updateBlog(String id, Blog updatedBlog) {
        if (blogRepository.existsById(id)) {
            updatedBlog.setId(id);
            return blogRepository.save(updatedBlog);
        }
        return null;
    }

    public List<Blog> getBlogsByUsername(String username) {
        return blogRepository.findByAuthor(username);
    }
    // Delete a blog
    public void deleteBlog(String id) {
        blogRepository.deleteById(id);
    }
}
