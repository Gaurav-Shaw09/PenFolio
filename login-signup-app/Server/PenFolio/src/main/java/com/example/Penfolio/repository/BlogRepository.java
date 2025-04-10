package com.example.Penfolio.repository;

import com.example.Penfolio.entity.Blog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BlogRepository extends MongoRepository<Blog, String> {
    List<Blog> findByUserId(String userId);
    List<Blog> findByUsername(String username);
    List<Blog> findByUserIdInOrderByCreatedAtDesc(List<String> userIds);
}

