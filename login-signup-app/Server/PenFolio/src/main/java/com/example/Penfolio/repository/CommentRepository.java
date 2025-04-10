package com.example.Penfolio.repository;

import com.example.Penfolio.entity.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentRepository extends MongoRepository<Comment, String> {
    // Additional query methods if needed
}