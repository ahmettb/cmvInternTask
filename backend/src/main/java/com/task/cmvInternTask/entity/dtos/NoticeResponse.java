package com.task.cmvInternTask.entity.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class NoticeResponse {

    private String topic;
    private  String content;
    private byte[] image;
    private Date dateOfValidity;
}
