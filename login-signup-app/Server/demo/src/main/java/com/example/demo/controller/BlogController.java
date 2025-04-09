package com.example.demo.controller;

import com.example.demo.entity.Blog;
import com.example.demo.entity.Comment;
import com.example.demo.entity.Notification;
import com.example.demo.entity.User;
import com.example.demo.repository.BlogRepository;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.NotificationRepository;
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
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private BlogService blogService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private NotificationRepository notificationRepository; // ✅ Inject NotificationRepository

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

    @GetMapping("/user/username/{username}")
    public ResponseEntity<List<Blog>> getBlogsByUsername(@PathVariable String username) {
        List<Blog> userBlogs = blogService.getBlogsByUsername(username);
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
    public ResponseEntity<?> createBlog(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("author") String author,
            @RequestParam("userId") String userId,
            @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

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

        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found!");
        }
        String username = userOptional.get().getUsername();

        String imagePath = file != null ? saveImage(file) : null;
        Blog blog = new Blog(title, content, author, userId, username, imagePath);

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

    // ✅ Like a blog
    @PostMapping("/{id}/like")
    public ResponseEntity<Blog> likeBlog(@PathVariable String id, @RequestParam String userId) {
        Optional<Blog> blogOptional = blogRepository.findById(id);
        if (!blogOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Blog blog = blogOptional.get();
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        User user = userOptional.get();
        if (blog.getLikedUsers().contains(userId)) {
            blog.setLikes(blog.getLikes() - 1);
            blog.getLikedUsers().remove(userId);
        } else {
            blog.setLikes(blog.getLikes() + 1);
            blog.getLikedUsers().add(userId);

            if (!userId.equals(blog.getUserId())) {
                Notification notification = new Notification(
                        blog.getUserId(),
                        "LIKE",
                        user.getUsername() + " liked " + blog.getTitle()
                );
                notification.setBlogId(id);
                notification.setFromUserId(userId);
                notificationRepository.save(notification);
            }
        }
        blogRepository.save(blog);
        return ResponseEntity.ok(blog);
    }
    // ✅ Add a comment to a blog
    @PostMapping("/{id}/comment")
    public ResponseEntity<Blog> addComment(@PathVariable String id, @RequestBody Comment comment) {
        Optional<Blog> blogOptional = blogRepository.findById(id);
        if (!blogOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Blog blog = blogOptional.get();
        comment.setId(UUID.randomUUID().toString());
        blog.getComments().add(comment);
        blogRepository.save(blog);

        Optional<User> commenterOptional = userRepository.findById(comment.getAuthorId());
        if (commenterOptional.isPresent() && !comment.getAuthorId().equals(blog.getUserId())) {
            User commenter = commenterOptional.get();
            Notification notification = new Notification(
                    blog.getUserId(),
                    "COMMENT",
                    commenter.getUsername() + " commented on " + blog.getTitle()
            );
            notification.setBlogId(id);
            notification.setFromUserId(comment.getAuthorId());
            notificationRepository.save(notification);
        }

        return ResponseEntity.ok(blog);
    }

    // ✅ Delete a comment
    @DeleteMapping("/{blogId}/comments/{commentId}")
    public ResponseEntity<?> deleteComment(
            @PathVariable String blogId,
            @PathVariable String commentId,
            @RequestBody Map<String, String> requestBody) {

        String currentUsername = requestBody.get("username");

        Optional<Comment> commentOptional = commentRepository.findById(commentId);
        if (commentOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Optional<Blog> blogOptional = blogRepository.findById(blogId);
        if (blogOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Comment comment = commentOptional.get();
        Blog blog = blogOptional.get();

        boolean isCommentAuthor = currentUsername.equals(comment.getAuthor());
        boolean isBlogAuthor = currentUsername.equals(blog.getAuthor());

        if (!isCommentAuthor && !isBlogAuthor) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("You can only delete your own comments or comments on your posts");
        }

        blog.getComments().removeIf(c -> c.getId().equals(commentId));
        blogRepository.save(blog);
        commentRepository.deleteById(commentId);

        return ResponseEntity.ok("Comment deleted successfully");
    }

    // ✅ Like a comment
    @PostMapping("/{blogId}/comments/{commentId}/like")
    public ResponseEntity<Comment> likeComment(
            @PathVariable String blogId,
            @PathVariable String commentId,
            @RequestParam String userId) {
        Optional<Blog> blogOptional = blogRepository.findById(blogId);
        if (!blogOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Blog blog = blogOptional.get();
        Optional<Comment> commentOptional = blog.getComments().stream()
                .filter(c -> c.getId().equals(commentId))
                .findFirst();
        if (!commentOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Comment comment = commentOptional.get();
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        User user = userOptional.get();
        if (comment.getLikedUsers().contains(userId)) {
            comment.setLikes(comment.getLikes() - 1);
            comment.getLikedUsers().remove(userId);
        } else {
            comment.setLikes(comment.getLikes() + 1);
            comment.getLikedUsers().add(userId);

            if (!userId.equals(comment.getAuthorId())) {
                Notification notification = new Notification(
                        comment.getAuthorId(),
                        "COMMENT_LIKE",
                        user.getUsername() + " liked your comment on " + blog.getTitle()
                );
                notification.setBlogId(blogId);
                notification.setFromUserId(userId);
                notificationRepository.save(notification);
            }
        }

        blogRepository.save(blog);
        return ResponseEntity.ok(comment);
    }

    // ✅ Fetch blogs of users the current user is following
    @GetMapping("/following/{userId}")
    public ResponseEntity<List<Blog>> getFollowingBlogs(@PathVariable String userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        User user = userOptional.get();
        List<String> followingIds = user.getFollowing();
        if (followingIds.isEmpty()) {
            return ResponseEntity.ok(List.of());
        }

        List<Blog> followingBlogs = blogRepository.findByUserIdInOrderByCreatedAtDesc(followingIds);
        return ResponseEntity.ok(followingBlogs);
    }
}