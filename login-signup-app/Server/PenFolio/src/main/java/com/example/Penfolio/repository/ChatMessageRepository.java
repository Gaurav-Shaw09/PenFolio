package com.example.Penfolio.repository;

import com.example.Penfolio.entity.ChatMessageEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatMessageRepository extends MongoRepository<ChatMessageEntity, String> {
    List<ChatMessageEntity> findByFromAndToOrFromAndTo(String from1, String to1, String from2, String to2);
}
