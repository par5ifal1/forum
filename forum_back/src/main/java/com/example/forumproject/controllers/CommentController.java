package com.example.forumproject.controllers;

import com.example.forumproject.bootstrap.CommentBootstrap;
import com.example.forumproject.models.Comment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/comment")
@RestController
public class CommentController {

    private CommentBootstrap commentBootstrap;


    public CommentController(CommentBootstrap commentBootstrap) {
        this.commentBootstrap = commentBootstrap;
    }

    @PostMapping("/new")
    public ResponseEntity<Comment> createComment(@RequestBody Comment Comment){
        return new ResponseEntity<Comment>(this.commentBootstrap.save(Comment), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable("id") Long id){
        commentBootstrap.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
