package com.task.cmvInternTask.exception;


import com.task.cmvInternTask.entity.ExceptionMessage;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@RestControllerAdvice
public class GlobalException {


    @ExceptionHandler({NewsNotFound.class})
    public ResponseEntity<ExceptionMessage> newsNotFound(NewsNotFound e, HttpServletRequest request) {


        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                ExceptionMessage.builder().status(HttpStatus.NOT_FOUND.value())
                        .date(new Date())
                        .message(e.getMessage()).build()

        );

    }


    @ExceptionHandler({NoticeNotFound.class})
    public ResponseEntity<ExceptionMessage> noticeNotFound(NoticeNotFound e, HttpServletRequest request) {


        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                ExceptionMessage.builder().status(HttpStatus.NOT_FOUND.value())
                        .date(new Date())
                        .message(e.getMessage()).build()

        );

    }


}
