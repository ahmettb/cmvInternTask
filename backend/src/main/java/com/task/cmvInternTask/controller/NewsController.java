package com.task.cmvInternTask.controller;

import com.task.cmvInternTask.entity.Event;
import com.task.cmvInternTask.entity.ResponseMessage;
import com.task.cmvInternTask.entity.dtos.NewRequestDto;
import com.task.cmvInternTask.entity.dtos.ResponseNew;
import com.task.cmvInternTask.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/news")
@CrossOrigin(origins = "http://localhost:3000")
public class NewsController {


    @Autowired
    NewsService newsService;

    @GetMapping("get-all-news")
    public ResponseEntity<List<ResponseNew>> getAllNews() {

        return new ResponseEntity<>(newsService.getAllNews(), HttpStatus.OK);

    }

    @PutMapping("update-news/{id}")
    public ResponseEntity<ResponseMessage> updateNews(@RequestBody NewRequestDto newRequestDto,
                                                      @PathVariable("id") long id) {
      ResponseMessage responseMessage=  newsService.updateNews(id, newRequestDto);
        return new ResponseEntity<>(responseMessage,HttpStatus.OK);

    }

    @GetMapping("get-all-detail-news")
    public ResponseEntity<List<Event>> getAllNewsDetail() {
        return new ResponseEntity<>(newsService.getAllDetailNews(), HttpStatus.OK);

    }

    @PostMapping("add-news")
    public ResponseEntity<?> addNews(@RequestBody NewRequestDto newRequestDto) {
        ResponseMessage responseMessage=    newsService.addNews(newRequestDto);
        return new ResponseEntity<>(responseMessage,HttpStatus.OK);

    }

    @GetMapping("get-news-by-id/{id}")
    public ResponseEntity<?> getNewById(@PathVariable("id") long id) {
        return new ResponseEntity<>(newsService.getNewsById(id), HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<ResponseMessage> deleteNews(@PathVariable("id") long id) {
        ResponseMessage responseMessage=  newsService.deleteNews(id);
        return new ResponseEntity<>(responseMessage,HttpStatus.OK);

    }
}
