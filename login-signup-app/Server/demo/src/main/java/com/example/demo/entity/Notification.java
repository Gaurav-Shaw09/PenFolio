package com.example.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "notifications")
public class Notification {
    @Id
    private String id;
    private String userId; // The user receiving the notification
    private String type; // e.g., "LIKE", "COMMENT", "COMMENT_LIKE", "FOLLOW"
    private String message; // e.g., "user123 liked your post"
    private String blogId; // ID of the blog (for LIKE, COMMENT, COMMENT_LIKE notifications)
    private String fromUserId; // ID of the user who triggered the notification (e.g., who liked, commented, or followed)
    private boolean isRead;
    private Date createdAt;

    // Default constructor
    public Notification() {
        this.createdAt = new Date();
        this.isRead = false;
    }

    // Constructor with required fields
    public Notification(String userId, String type, String message) {
        this.userId = userId;
        this.type = type;
        this.message = message;
        this.createdAt = new Date();
        this.isRead = false;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getBlogId() {
        return blogId;
    }

    public void setBlogId(String blogId) {
        this.blogId = blogId;
    }

    public String getFromUserId() {
        return fromUserId;
    }

    public void setFromUserId(String fromUserId) {
        this.fromUserId = fromUserId;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        this.isRead = read;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}