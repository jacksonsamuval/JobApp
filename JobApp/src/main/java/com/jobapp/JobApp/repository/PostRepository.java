package com.jobapp.JobApp.repository;

import com.jobapp.JobApp.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post, String> {
}
