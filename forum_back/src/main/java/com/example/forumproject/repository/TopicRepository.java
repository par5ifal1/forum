package com.example.forumproject.repository;

import com.example.forumproject.models.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface TopicRepository extends JpaRepository<Topic, Long> {
}
