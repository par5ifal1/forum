package com.example.forumproject.bootstrap;

import com.example.forumproject.models.Comment;
import com.example.forumproject.repository.CommentRepository;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

@Component
public class CommentBootstrap {
    private final CommentRepository commentRepository;

    public CommentBootstrap(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }
    @Transactional
    public Comment findCommentById(Long id){
        return commentRepository.getById(id);
    }

    @Transactional
    public Comment save(Comment comment){
        return commentRepository.save(comment);
    }

    @Transactional
    public List<Comment> findAll(){
        return commentRepository.findAll();
    }

    @Transactional
    public void delete(Long id){
        commentRepository.delete(this.findCommentById(id));
    }

    @Transactional
    public void update(Comment comment, Long id){
        comment.setId(id);
        commentRepository.save(comment);
    }
}
