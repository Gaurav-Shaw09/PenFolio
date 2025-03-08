package com.example.demo.controller;

import com.example.demo.entity.Blog;
import com.example.demo.repository.BlogRepository;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
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
    @PostMapping("/api/blogs")
    public ResponseEntity<?> createBlog(@RequestBody Blog blog) {
        System.out.println("Received Blog: " + blog); // Debugging
        if (blog.getTitle() == null || blog.getContent() == null || blog.getAuthor() == null) {
            return ResponseEntity.badRequest().body("Missing required fields");
        }
        return ResponseEntity.ok(blogRepository.save(blog));
    }

    // 2️⃣ Create a blog with an uploaded image
    @PostMapping
    public Blog createBlog(@RequestParam("title") String title,
                           @RequestParam("content") String content,
                           @RequestParam("author") String author,
                           @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

        String imagePath = file != null ? saveImage(file) : null;
        Blog blog = new Blog(title, content, author, imagePath);
        return blogRepository.save(blog);
    }

    // 3️⃣ Get all blogs
    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    // 4️⃣ Get a blog by ID
    @GetMapping("/{id}")
    public Blog getBlogById(@PathVariable String id) {
        return blogRepository.findById(id).orElse(null);
    }

    // 5️⃣ Update blog with a new image (optional)
    @PutMapping("/{id}")
    public Blog updateBlog(@PathVariable String id,
                           @RequestParam("title") String title,
                           @RequestParam("content") String content,
                           @RequestParam("author") String author,
                           @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

        Optional<Blog> existingBlog = blogRepository.findById(id);
        if (existingBlog.isPresent()) {
            Blog updatedBlog = existingBlog.get();
            updatedBlog.setTitle(title);
            updatedBlog.setContent(content);
            updatedBlog.setAuthor(author);

            if (file != null) {
                String imagePath = saveImage(file);
                updatedBlog.setImagePath(imagePath);
            }

            return blogRepository.save(updatedBlog);
        }
        return null;
    }
    @GetMapping("/uploads/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get("uploads").resolve(filename).normalize();
            UrlResource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + ((UrlResource) resource).getFilename() + "\"")
                        .body((Resource) resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // 6️⃣ Delete a blog
    @DeleteMapping("/{id}")
    public String deleteBlog(@PathVariable String id) {
        blogRepository.deleteById(id);
        return "Blog deleted successfully!";
    }
}
