package com.example.Penfolio.repository;

import com.example.Penfolio.entity.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findByUserId(String userId);
    List<Notification> findByUserIdAndIsReadFalse(String userId);
    void deleteByUserId(String userId);
}