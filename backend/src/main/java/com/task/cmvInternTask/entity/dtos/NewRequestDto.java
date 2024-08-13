package com.task.cmvInternTask.entity.dtos;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
public class NewRequestDto {

    private String topic;
    @Size(max = 512)
    private  String content;
    private Date dateOfValidity;
    private String newLink;
}
