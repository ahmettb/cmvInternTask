package com.task.cmvInternTask.entity.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeResponse {

    private String topic;
    private  String content;
    private byte[] image;
}
