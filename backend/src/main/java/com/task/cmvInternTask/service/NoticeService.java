package com.task.cmvInternTask.service;

import com.task.cmvInternTask.entity.Event;
import com.task.cmvInternTask.entity.Notice;
import com.task.cmvInternTask.entity.ResponseMessage;
import com.task.cmvInternTask.entity.dtos.NoticeRequestDto;
import com.task.cmvInternTask.entity.dtos.NoticeResponse;
import com.task.cmvInternTask.exception.NoticeNotFound;
import com.task.cmvInternTask.factory.EventFactory;
import com.task.cmvInternTask.factory.EventFilterFactory;
import com.task.cmvInternTask.factory.NoticeFactory;
import com.task.cmvInternTask.repository.IEventRepository;
import lombok.extern.log4j.Log4j2;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Log4j2
@Service
public class NoticeService {


    @Autowired
    private IEventRepository eventRepository;

    public ResponseMessage addNotice(MultipartFile file, NoticeRequestDto noticeRequestDto) throws IOException {
        log.info("Adding new notice with topic: {}", noticeRequestDto.getTopic());
        try {
            Notice notice = new Notice();
            notice.setContent(noticeRequestDto.getContent());
            notice.setTopic(noticeRequestDto.getTopic());
            notice.setDateOfValidity(noticeRequestDto.getDateOfValidity());
            notice.setImage(file.getBytes());

            eventRepository.save(notice);
            log.info("Notice added successfully with id: {}", notice.getId());
            return ResponseMessage.builder().message("Notice added successfuly").build();

        } catch (IOException e) {
            log.error("Error while saving notice", e);
            throw e;
        }
    }

    public ResponseMessage updateNotice(long id, NoticeRequestDto noticeRequestDto) throws IOException {
        log.info("Updating notice with id: {}", id);
        try {
            Notice notice = (Notice) eventRepository.findById(id)
                    .orElseThrow(() -> new NoticeNotFound("Notice not found"));
            notice.setContent(noticeRequestDto.getContent());
            notice.setTopic(noticeRequestDto.getTopic());
            notice.setDateOfValidity(noticeRequestDto.getDateOfValidity());
            if (noticeRequestDto.getImage() != null && !noticeRequestDto.getImage().isEmpty()) {
                notice.setImage(noticeRequestDto.getImage().getBytes());
            }
            eventRepository.save(notice);
            log.info("Notice updated successfully with id: {}", id);
            return ResponseMessage.builder().message("Notice updated successfuly").build();

        } catch (IOException e) {
            log.error("Error while updating notice with id: {}", id, e);
            throw e;
        }
    }

    public ResponseMessage deleteNotice(long id) {
        log.info("Deleting notice with id: {}", id);
        try {
            eventRepository.deleteById(id);
            log.info("Notice deleted successfully with id: {}", id);
            return ResponseMessage.builder().message("Notice deleted successfuly").build();

        } catch (EmptyResultDataAccessException e) {
            log.error("Notice with id {} not found for deletion", id);
            throw new NoticeNotFound("Notice not found");
        }
    }

    public List<Event> getAllNotice() {
        log.info("Fetching all notices");
        List<Event> notices = eventRepository.findAll().stream()
                .filter(EventFilterFactory.createFilter("Notice"))
                .toList();

        if(notices.isEmpty())throw  new NoticeNotFound("Notice Not Found");
        log.info("Fetched {} notices", notices.size());
        return notices;
    }

    public List<NoticeResponse> getNotices() {
        log.info("Fetching all notice responses");
        EventFactory factory = new NoticeFactory();
        List<NoticeResponse> noticeResponses = factory.createNoticeResponse(eventRepository.findAll());
        if(noticeResponses.isEmpty())throw  new NoticeNotFound("Notice Not Found");

        log.info("Fetched {} notice responses", noticeResponses.size());
        return noticeResponses;
    }

    public byte[] getImage(long id) {
        log.info("Fetching image for notice with id: {}", id);
        try {
            Notice notice = (Notice) eventRepository.findById(id)
                    .orElseThrow(() -> new NoticeNotFound("Notice not found"));
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setContentType(MediaType.IMAGE_JPEG);
            return notice.getImage();
        } catch (Exception e) {
            log.error("Error fetching image for notice with id: {}", id, e);
            throw new RuntimeException("Error fetching image");
        }
    }

    public Notice getNoticeById(long id) {
        log.info("Fetching notice by id: {}", id);
        Notice notice = (Notice) eventRepository.findById(id)
                .orElseThrow(() -> new NoticeNotFound("Notice not found"));
        return notice;
    }
}
