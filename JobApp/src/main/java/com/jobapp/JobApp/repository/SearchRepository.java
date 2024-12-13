package com.jobapp.JobApp.repository;

import com.jobapp.JobApp.model.Post;

import java.util.List;

public interface SearchRepository {
    List<Post> findByText(String text);
}
