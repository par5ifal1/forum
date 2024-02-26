package com.example.forumproject.controllers;

import com.example.forumproject.bootstrap.TopicBootstrap;
import com.example.forumproject.models.Comment;
import com.example.forumproject.models.Topic;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/topic")
@RestController
public class TopicController {

    private TopicBootstrap topicBootstrap;

    public TopicController(TopicBootstrap topicBootstrap) {
        this.topicBootstrap = topicBootstrap;
    }
    @PostMapping("/{id}/comment")
    public ResponseEntity<Topic> addComment(@RequestBody Comment comment, @PathVariable("id") Long id){
        Topic topic = topicBootstrap.findTopicById(id);
        topicBootstrap.addComment(topic, comment);
        return new ResponseEntity<Topic>(this.topicBootstrap.save(topic), HttpStatus.OK);
    }

    @DeleteMapping("/{id}/comment")
    public ResponseEntity<Topic> deleteComment(@RequestBody Comment comment, @PathVariable("id") Long id){
        Topic topic = topicBootstrap.findTopicById(id);
        topicBootstrap.addComment(topic, comment);
        return new ResponseEntity<Topic>(this.topicBootstrap.save(topic), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Topic>> getAllTopics(){
        return new ResponseEntity<List<Topic>>(topicBootstrap.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Topic> getTopic(@PathVariable("id") Long id){
        Topic topic = topicBootstrap.findTopicById(id);
        System.out.println(topic);
        return new ResponseEntity<Topic>(topic, HttpStatus.OK);
    }

    @PostMapping("/new")
    public ResponseEntity<Topic> newTopic(@RequestBody Topic Topic){
        return new ResponseEntity<Topic>(this.topicBootstrap.save(Topic), HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Topic> updateTopic(@RequestBody Topic Topic, @PathVariable("id") Long id){
        Topic.setId(id);
        return new ResponseEntity<Topic>(this.topicBootstrap.save(Topic), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTopic(@PathVariable("id") Long id){
        topicBootstrap.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
