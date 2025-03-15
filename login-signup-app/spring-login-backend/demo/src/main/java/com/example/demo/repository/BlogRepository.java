package com.example.demo.repository;

import com.example.demo.entity.Blog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BlogRepository extends MongoRepository<Blog, String> {

    // Find blogs by userId (instead of just author name)
    List<Blog> findByUserId(String userId);
}
