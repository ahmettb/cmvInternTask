package com.task.cmvInternTask.entity.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ResponseNew {
    private String topic;
    private  String content;
    private Date dateOfValidity;
    private String newsLink;
}
