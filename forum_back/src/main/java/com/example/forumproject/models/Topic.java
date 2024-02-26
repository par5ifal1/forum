package com.example.forumproject.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Entity
@JsonIgnoreProperties(value= {"handler","hibernateLazyInitializer","FieldHandler"})
public class Topic extends BaseEntity{
    private String label;

    @Lob
    @Column(columnDefinition="TEXT")
    private String description;
    @OneToMany(cascade = CascadeType.REMOVE)
    private Set<Comment> comments;

    public Set<Comment> getComments() {
        return comments;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Topic topic = (Topic) o;
        return getId().equals(topic.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }
    @Override
    public String toString() {
        return "Topic{" +
                "label='" + label + '\'' +
                ", description='" + description + '\'' +
                ", comments=" + comments +
                '}';
    }
}
