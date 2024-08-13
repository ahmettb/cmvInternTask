package com.task.cmvInternTask.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class News extends     Event{


    @Column(length=512)
    private String   newLink;
}
