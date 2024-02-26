package com.example.forumproject.bootstrap;

import com.example.forumproject.models.Comment;
import com.example.forumproject.models.Topic;
import com.example.forumproject.repository.TopicRepository;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

@Component
public class TopicBootstrap {
    private TopicRepository topicRepository;

    public TopicBootstrap(TopicRepository TopicRepository) {
        this.topicRepository = TopicRepository;
    }

    @Transactional
    public Topic findTopicById(Long id){
        return topicRepository.getById(id);
    }

    @Transactional
    public Topic save(Topic topic){
        return topicRepository.save(topic);
    }

    @Transactional
    public List<Topic> findAll(){
        return topicRepository.findAll();
    }

    @Transactional
    public void delete(Long id){
        topicRepository.delete(this.findTopicById(id));
    }

    @Transactional
    public void update(Topic topic, Long id){
        topic.setId(id);
        topicRepository.save(topic);
    }

    @Transactional
    public void addComment(Topic topic,Comment comment){
        topic.getComments().add(comment);
	topicRepository.save(topic);
    }
}
