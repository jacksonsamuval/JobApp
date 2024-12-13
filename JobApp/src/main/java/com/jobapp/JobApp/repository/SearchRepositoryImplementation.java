package com.jobapp.JobApp.repository;

import com.jobapp.JobApp.model.Post;
import com.mongodb.client.MongoClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
import org.bson.Document;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.AggregateIterable;

@Component
public class SearchRepositoryImplementation implements SearchRepository {

    @Autowired
    MongoClient mongoClient;

    @Autowired
    MongoConverter mongoConverter;

    @Override
    public List<Post> findByText(String text) {
        final List<Post> posts = new ArrayList<>();

        MongoDatabase database = mongoClient.getDatabase("JpnApp");
        MongoCollection<Document> collection = database.getCollection("JobPost");

        AggregateIterable<Document> result = collection.aggregate(Arrays.asList(
                new Document("$search",
                        new Document("text",
                                new Document("query", text) // Use dynamic 'text' parameter here
                                        .append("path", Arrays.asList("techs", "desc", "profile"))
                        )
                )
        ));

        result.forEach(doc -> posts.add(mongoConverter.read(Post.class, doc)));
        return posts;
    }
}
