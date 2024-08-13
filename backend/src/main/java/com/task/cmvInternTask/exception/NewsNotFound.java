package com.task.cmvInternTask.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NewsNotFound extends  RuntimeException{


    public  NewsNotFound(String m)
    {
        super(m);
    }
}
