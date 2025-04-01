package com.example.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "comments")
public class Comment {
    @Id
    private String id;
    private String blogId;
    private String content;
    private String author; // Username of the commenter
    private String authorId; // User ID of the commenter
    private Date createdAt;
    private int likes;
    private List<String> likedUsers;

    public Comment() {
        this.createdAt = new Date();
        this.likes = 0;
        this.likedUsers = new ArrayList<>();
    }

    public Comment(String content, String author, String authorId, String blogId) {
        this.content = content;
        this.author = author;
        this.authorId = authorId;
        this.blogId = blogId;
        this.createdAt = new Date();
        this.likes = 0;
        this.likedUsers = new ArrayList<>();
    }

    // Getters and setters
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

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
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
}