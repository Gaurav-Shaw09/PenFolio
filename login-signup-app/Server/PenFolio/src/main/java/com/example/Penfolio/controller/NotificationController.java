package com.example.Penfolio.controller;

import com.example.Penfolio.entity.Notification;
import com.example.Penfolio.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable String userId) {
        List<Notification> notifications = notificationRepository.findByUserId(userId);
        return ResponseEntity.ok(notifications);
    }

    @PutMapping("/{userId}/read")
    public ResponseEntity<Void> markNotificationsAsRead(@PathVariable String userId) {
        List<Notification> notifications = notificationRepository.findByUserId(userId);
        notifications.forEach(notif -> {
            notif.setRead(true);
            notificationRepository.save(notif);
        });
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> clearNotifications(@PathVariable String userId) {
        try {
            notificationRepository.deleteByUserId(userId);
            return ResponseEntity.ok("Notifications cleared successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error clearing notifications: " + e.getMessage());
        }
    }
}