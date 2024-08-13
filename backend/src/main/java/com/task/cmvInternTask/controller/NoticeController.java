package com.task.cmvInternTask.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.task.cmvInternTask.entity.Event;
import com.task.cmvInternTask.entity.Notice;
import com.task.cmvInternTask.entity.ResponseMessage;
import com.task.cmvInternTask.entity.dtos.NoticeRequestDto;
import com.task.cmvInternTask.entity.dtos.NoticeResponse;
import com.task.cmvInternTask.entity.dtos.ResponseNew;
import com.task.cmvInternTask.service.NoticeService;
import org.apache.tomcat.util.json.JSONParser;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api/notice")
@CrossOrigin(origins = "http://localhost:3000")

public class NoticeController {
    @Autowired
    NoticeService noticeService;

    @PostMapping(value = "add-notice")
    public ResponseEntity<ResponseMessage> addNotice(

            @RequestPart("file") MultipartFile file, @RequestPart("data") String noticeRequestDtoJson) throws IOException, ParseException {

        NoticeRequestDto noticeRequestDto = new ObjectMapper().readValue(noticeRequestDtoJson, NoticeRequestDto.class);
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(noticeRequestDtoJson);
        String dateOfValidityString = jsonNode.get("dateOfValidity").asText();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        Date dateOfValidity = dateFormat.parse(dateOfValidityString);
        noticeRequestDto.setDateOfValidity(dateOfValidity);

       ResponseMessage responseMessage= noticeService.addNotice(file, noticeRequestDto);
        return new ResponseEntity<>(responseMessage,HttpStatus.OK);

    }


    @GetMapping("get-all-detail")
    public ResponseEntity<List<Event>> getAllDetail() {
        return new ResponseEntity<>(noticeService.getAllNotice(), HttpStatus.OK);
    }


    @GetMapping("get-all")
    public ResponseEntity<List<NoticeResponse>> getNotices() {
        return new ResponseEntity<>(noticeService.getNotices(), HttpStatus.OK);
    }


    @GetMapping("get-image/{id}")
    public HttpEntity<byte[]> getImage(@PathVariable("id") long id) {
        return new ResponseEntity<>(noticeService.getImage(id), HttpStatus.OK);
    }


    @DeleteMapping("delete-notice/{id}")
    public ResponseEntity<ResponseMessage> delete(@PathVariable("id") long id) {
       ResponseMessage responseMessage= noticeService.deleteNotice(id);
        return new ResponseEntity<>(responseMessage,HttpStatus.OK);
    }

    @PutMapping("update-notice/{id}")
    public ResponseEntity<ResponseMessage> updateNew(@RequestPart MultipartFile imageFile,
                                       @PathVariable("id") long id, @RequestPart String data) throws IOException {


        NoticeRequestDto noticeRequestDto = new ObjectMapper().readValue(data, NoticeRequestDto.class);
        noticeRequestDto.setImage(imageFile);
       ResponseMessage responseMessage= noticeService.updateNotice(id, noticeRequestDto);
        return new ResponseEntity<>(responseMessage,HttpStatus.OK);


    }

    @GetMapping("get-notice-by-id/{id}")
    public ResponseEntity<Notice> getNoticeById(@PathVariable("id") long id) throws IOException {

        return new ResponseEntity<>(noticeService.getNoticeById(id)
                , HttpStatus.OK);


    }

}
