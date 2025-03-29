package com.example.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "comments")
public class Comment {
    @Id
    private String id;
    private String blogId;
    private String author;
    private String content;
    private int likes = 0;
    private List<String> likedUsers = new ArrayList<>();

    // Constructors, Getters, and Setters

    public Comment() {
    }

    public Comment(String blogId, String author, String content) {
        this.blogId = blogId;
        this.author = author;
        this.content = content;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBlogId() {
        return blogId;
    }

    public void setBlogId(String blogId) {
        this.blogId = blogId;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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

    // Helper method to toggle like
    public void toggleLike(String userId) {
        if (likedUsers.contains(userId)) {
            // User already liked, so unlike
            likedUsers.remove(userId);
            likes--;
        } else {
            // User hasn't liked yet, so like
            likedUsers.add(userId);
            likes++;
        }
    }
}