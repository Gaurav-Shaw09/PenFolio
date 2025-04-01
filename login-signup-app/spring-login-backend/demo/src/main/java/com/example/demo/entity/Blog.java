package com.example.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "blogs")
public class Blog {
    @Id
    private String id;
    private String title;
    private String content;
    private String author; // Username of the blog author
    private String userId; // ID of the blog author
    private String username; // Username of the blog author (redundant with author, but included as per your code)
    private String imagePath;
    private Date createdAt;
    private int likes;
    private List<String> likedUsers;
    private List<Comment> comments; // List of comments

    public Blog() {
        this.createdAt = new Date();
        this.likes = 0;
        this.likedUsers = new ArrayList<>();
        this.comments = new ArrayList<>(); // Initialize the comments list
    }

    public Blog(String title, String content, String author, String userId, String username, String imagePath) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.userId = userId;
        this.username = username;
        this.imagePath = imagePath;
        this.createdAt = new Date();
        this.likes = 0;
        this.likedUsers = new ArrayList<>();
        this.comments = new ArrayList<>(); // Initialize the comments list
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public List<String> getLikedUsers() {
        return likedUsers;
    }

    public void setLikedUsers(List<String> likedUsers) {
        this.likedUsers = likedUsers;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}