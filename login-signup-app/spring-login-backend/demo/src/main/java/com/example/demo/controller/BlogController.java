package com.example.demo.controller;

import com.example.demo.entity.Blog;
import com.example.demo.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    @Autowired
    private BlogRepository blogRepository;

    private static final String UPLOAD_DIR = "uploads/";

    // Method to handle image upload
    private String saveImage(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return null;
        }

        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdir();
        }

        String filePath = UPLOAD_DIR + file.getOriginalFilename();
        Path path = Paths.get(filePath);
        file.transferTo(path);

        return filePath; // Return stored image path
    }

    // 1️⃣ Upload an image separately
    @PostMapping("/upload")
    public String uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        String savedPath = saveImage(file);
        return savedPath != null ? "Image uploaded: " + savedPath : "Failed to upload image!";
    }

    // 2️⃣ Create a blog post
    @PostMapping
    public ResponseEntity<?> createBlog(@RequestParam("title") String title,
                                        @RequestParam("content") String content,
                                        @RequestParam("author") String author,
                                        @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

        // ✅ Debugging
        System.out.println("Received Title: " + title);
        System.out.println("Received Content: " + content);
        System.out.println("Received Author: " + author);

        if (title == null || title.trim().isEmpty() ||
                content == null || content.trim().isEmpty() ||
                author == null || author.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Title, content, and author cannot be empty.");
        }

        String imagePath = file != null ? saveImage(file) : null;
        Blog blog = new Blog(title, content, author, imagePath);

        blogRepository.save(blog);
        return ResponseEntity.ok(blog);
    }

    // 3️⃣ Get all blogs
    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    // 4️⃣ Get a blog by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getBlogById(@PathVariable String id) {
        Optional<Blog> blog = blogRepository.findById(id);
        return blog.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 5️⃣ Update blog (No Spring Security, using author verification manually)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBlog(@PathVariable String id,
                                        @RequestParam("title") String title,
                                        @RequestParam("content") String content,
                                        @RequestParam("author") String author, // Pass author from frontend
                                        @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

        Optional<Blog> existingBlog = blogRepository.findById(id);
        if (existingBlog.isPresent()) {
            Blog updatedBlog = existingBlog.get();

            // ✅ Ensure only the author can edit the blog
            if (!updatedBlog.getAuthor().equals(author)) {
                return ResponseEntity.status(403).body("You are not allowed to edit this blog.");
            }

            updatedBlog.setTitle(title);
            updatedBlog.setContent(content);

            if (file != null) {
                String imagePath = saveImage(file);
                updatedBlog.setImagePath(imagePath);
            }

            return ResponseEntity.ok(blogRepository.save(updatedBlog));
        }
        return ResponseEntity.notFound().build();
    }

    // 6️⃣ Serve uploaded images
    @GetMapping("/uploads/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(UPLOAD_DIR).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // 7️⃣ Delete a blog (No Spring Security, using author verification manually)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBlog(@PathVariable String id, @RequestParam("author") String author) {
        Optional<Blog> blog = blogRepository.findById(id);
        if (blog.isPresent()) {
            // ✅ Ensure only the blog owner can delete it
            if (!blog.get().getAuthor().equals(author)) {
                return ResponseEntity.status(403).body("You are not allowed to delete this blog.");
            }

            blogRepository.deleteById(id);
            return ResponseEntity.ok("Blog deleted successfully!");
        }
        return ResponseEntity.notFound().build();
    }


        @GetMapping("/user/{username}")
        public ResponseEntity<List<Blog>> getBlogsByUser(@PathVariable String username) {
            List<Blog> userBlogs = blogService.getBlogsByUsername(username);
            return ResponseEntity.ok(userBlogs);
        }
    }
}
