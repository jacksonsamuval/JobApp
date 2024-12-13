package com.jobapp.JobApp.controller;

import com.jobapp.JobApp.model.Post;
import com.jobapp.JobApp.repository.PostRepository;
import com.jobapp.JobApp.repository.SearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private SearchRepository searchRepository;

    @GetMapping("/allPosts")
    public List<Post> getAllPosts(){
        return postRepository.findAll();
    }

    @PostMapping("/post")
    public Post addPost(@RequestBody Post post)
    {
        return postRepository.save(post);
    }

    @GetMapping("/posts/{text}")
    public List<Post> search(@PathVariable String text)
    {
        return searchRepository.findByText(text);
    }

}
