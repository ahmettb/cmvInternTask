package com.task.cmvInternTask.service;

import com.task.cmvInternTask.entity.Event;
import com.task.cmvInternTask.entity.News;
import com.task.cmvInternTask.entity.ResponseMessage;
import com.task.cmvInternTask.entity.dtos.NewRequestDto;
import com.task.cmvInternTask.entity.dtos.ResponseNew;
import com.task.cmvInternTask.exception.NewsNotFound;
import com.task.cmvInternTask.factory.EventFilterFactory;
import com.task.cmvInternTask.repository.IEventRepository;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Log4j2
@Service
public class NewsService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private IEventRepository eventRepository;

    public ResponseMessage addNews(NewRequestDto newRequestDto) {
        try {
            log.info("Adding news with topic: {}", newRequestDto.getTopic());
            News entityNews = modelMapper.map(newRequestDto, News.class);
            entityNews.setNewLink(newRequestDto.getNewLink());
            entityNews.setDateOfValidity(newRequestDto.getDateOfValidity());
            eventRepository.save(entityNews);
            log.info("News added successfully with id: {}", entityNews.getId());
            return ResponseMessage.builder().message("News added successfuly").build();

        } catch (Exception e) {
            log.error("Error adding news: {}", e.getMessage(), e);
            throw new RuntimeException("Error adding news: " + e.getMessage(), e);
        }
    }

    public Event getNewsById(long id) {
        try {
            log.info("Fetching news by id: {}", id);
            Event event = eventRepository.findById(id)
                    .orElseThrow(() -> new NewsNotFound("News not found with id: " + id));
            return event;
        } catch (NewsNotFound e) {
            log.error("News not found with id: {}", id);
            throw e;
        } catch (Exception e) {
            log.error("Error fetching news by id: {}", id, e);
            throw new RuntimeException("Error fetching news: " + e.getMessage(), e);
        }
    }

    public ResponseMessage updateNews(long newId, NewRequestDto newRequestDto) {
        try {
            log.info("Updating news with id: {}", newId);
            News news = (News) eventRepository.findById(newId)
                    .orElseThrow(() -> new NewsNotFound("News not found with id: " + newId));
            news.setContent(newRequestDto.getContent());
            news.setTopic(newRequestDto.getTopic());
            news.setNewLink(newRequestDto.getNewLink());
            news.setDateOfValidity(newRequestDto.getDateOfValidity());
            eventRepository.save(news);
            log.info("News updated successfully with id: {}", newId);
            return ResponseMessage.builder().message("Updated Successfuly").build();

        } catch (NewsNotFound e) {
            log.error("News not found with id: {}", newId);
            throw e;
        } catch (Exception e) {
            log.error("Error updating news with id: {}", newId, e);
            throw new RuntimeException("Error updating news: " + e.getMessage(), e);
        }
    }

    public List<ResponseNew> getAllNews() {
        try {


            log.info("Fetching all news");
            List<Event> newList = eventRepository.findAll().stream()
                    .filter(event -> event instanceof News)
                    .toList();
            List<ResponseNew> responseNewList = new ArrayList<>();
            newList.forEach(newItem -> {
                newItem=(News)newItem;
                ResponseNew responseNew = modelMapper.map(newItem, ResponseNew.class);
                responseNew.setNewsLink(((News) newItem).getNewLink());
                responseNewList.add(responseNew);
            });
            log.info("Fetched {} news items", responseNewList.size());
            return responseNewList;
        } catch (Exception e) {
            log.error("Error retrieving all news: {}", e.getMessage(), e);
            throw new RuntimeException("Error retrieving all news: " + e.getMessage(), e);
        }
    }

    public List<Event> getAllDetailNews() {
        try {
            log.info("Fetching all detailed news");
            List<Event> newsList = eventRepository.findAll().stream()
                    .filter(EventFilterFactory.createFilter("News"))
                    .toList();
            if(newsList.isEmpty())throw new NewsNotFound("News Not Found");
            log.info("Fetched {} detailed news items", newsList.size());
            return newsList;
        } catch (Exception e) {
            log.error("Error retrieving all detailed news: {}", e.getMessage(), e);
            throw new RuntimeException("Error retrieving all detailed news: " + e.getMessage(), e);
        }
    }

    public ResponseMessage deleteNews(long id) {
        try {
            log.info("Deleting news with id: {}", id);
            eventRepository.deleteById(id);
            log.info("News deleted successfully with id: {}", id);
            return ResponseMessage.builder().message("Deleted Successfuly").build();

        } catch (EmptyResultDataAccessException e) {
            log.error("No news found with id: {}", id);
            throw new NewsNotFound("No news found with id: " + id);
        } catch (Exception e) {
            log.error("Error deleting news with id: {}", id, e);
            throw new RuntimeException("Error deleting news: " + e.getMessage(), e);
        }
    }
}
