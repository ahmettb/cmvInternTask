package com.task.cmvInternTask.entity.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
@Getter
@Setter
public class NoticeRequestDto {

    private String topic;

    @Size(max = 512)
    private  String content;

    private Date dateOfValidity;
    private MultipartFile image;


}
