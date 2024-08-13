package com.task.cmvInternTask.entity;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Notice extends Event{

    private byte[] image;
}
