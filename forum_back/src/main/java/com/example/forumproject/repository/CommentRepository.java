package com.example.forumproject.repository;

import com.example.forumproject.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface CommentRepository extends JpaRepository<Comment, Long> {
}
