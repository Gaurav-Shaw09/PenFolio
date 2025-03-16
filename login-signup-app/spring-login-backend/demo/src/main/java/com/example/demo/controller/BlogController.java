package com.example.demo.controller;

import com.example.demo.entity.Blog;
import com.example.demo.entity.User;
import com.example.demo.repository.BlogRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private BlogService blogService;

    @Autowired
    private UserRepository userRepository; // ✅ Inject UserRepository to fetch username

    private static final String UPLOAD_DIR = "uploads/";

    // ✅ Method to handle image upload
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

        return filePath;
    }

    // ✅ Fetch blogs by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Blog>> getBlogsByUserId(@PathVariable String userId) {
        List<Blog> userBlogs = blogService.getBlogsByUserId(userId);
        return ResponseEntity.ok(userBlogs);
    }

    // ✅ Upload an image separately
    @PostMapping("/upload")
    public String uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        String savedPath = saveImage(file);
        return savedPath != null ? "Image uploaded: " + savedPath : "Failed to upload image!";
    }

    // ✅ Create a new blog
    @PostMapping
    public ResponseEntity<?> createBlog(@RequestParam("title") String title,
                                        @RequestParam("content") String content,
                                        @RequestParam("author") String author,
                                        @RequestParam("userId") String userId,
                                        @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

        // ✅ Debugging
        System.out.println("Received Title: " + title);
        System.out.println("Received Content: " + content);
        System.out.println("Received Author: " + author);
        System.out.println("Received User ID: " + userId);

        if (title == null || title.trim().isEmpty() ||
                content == null || content.trim().isEmpty() ||
                author == null || author.trim().isEmpty() ||
                userId == null || userId.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Title, content, author, and userId cannot be empty.");
        }

        // ✅ Fetch username from User repository
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found!");
        }
        String username = userOptional.get().getUsername(); // ✅ Extract username

        String imagePath = file != null ? saveImage(file) : null;
        Blog blog = new Blog(title, content, author, userId, username, imagePath); // ✅ Store username

        blogRepository.save(blog);
        return ResponseEntity.ok(blog);
    }

    // ✅ Get all blogs
    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    // ✅ Get a blog by ID
    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable String id) {
        Optional<Blog> blog = blogRepository.findById(id);
        return blog.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // ✅ Update a blog (Only the original author can edit)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBlog(
            @PathVariable String id,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        System.out.println("Received Update Request for Blog ID: " + id);
        System.out.println("New Title: " + title);
        System.out.println("New Content: " + content);
        System.out.println("New Image: " + (image != null ? image.getOriginalFilename() : "No new image uploaded"));

        Optional<Blog> optionalBlog = blogRepository.findById(id);

        if (!optionalBlog.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Blog not found");
        }

        Blog blog = optionalBlog.get();
        blog.setTitle(title);
        blog.setContent(content);

        // ✅ Save new image if provided
        if (image != null && !image.isEmpty()) {
            try {
                String imagePath = saveImage(image);
                blog.setImagePath(imagePath);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving image");
            }
        }

        blogRepository.save(blog);
        return ResponseEntity.ok("Blog updated successfully!");
    }

    // ✅ Serve uploaded images
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

    // ✅ Delete a blog (Only the original author can delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBlog(@PathVariable String id, @RequestBody Map<String, String> requestBody) {
        String userId = requestBody.get("userId");
        Optional<Blog> blog = blogRepository.findById(id);

        if (blog.isPresent()) {
            if (!blog.get().getUserId().equals(userId)) {
                return ResponseEntity.status(403).body("You are not allowed to delete this blog.");
            }

            blogRepository.deleteById(id);
            return ResponseEntity.ok("Blog deleted successfully!");
        }

        return ResponseEntity.notFound().build();
    }

    // ✅ Fetch image by filename
    private final Path uploadDir = Paths.get("uploads");

    @GetMapping("/images/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path filePath = uploadDir.resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok().body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
