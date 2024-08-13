package com.task.cmvInternTask.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Builder
@Getter
@Setter
public class ExceptionMessage {

    private String message;
    private int status;
    private Date date;
}
