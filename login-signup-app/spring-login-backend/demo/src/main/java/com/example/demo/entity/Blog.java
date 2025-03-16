package com.example.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "blogs")
public class Blog {
    @Id
    private String id;
    private String title;
    private String content;
    private String author;  // Author name
    private String userId;  // User ID (Reference to User Collection)
    private String username;  // ✅ Store Username directly
    private String imagePath;

    // ✅ Constructors
    public Blog(String title, String content, String author, String userId, String username, String imagePath) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.userId = userId;
        this.username = username;  // ✅ Store username at the time of blog creation
        this.imagePath = imagePath;
    }

    // ✅ Default Constructor
    public Blog() {}

    // ✅ Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getUsername() { return username; }  // ✅ Getter for username
    public void setUsername(String username) { this.username = username; }  // ✅ Setter for username

    public String getImagePath() { return imagePath; }
    public void setImagePath(String imagePath) { this.imagePath = imagePath; }
}
