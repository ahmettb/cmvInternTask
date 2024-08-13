package com.task.cmvInternTask.factory;

import com.task.cmvInternTask.entity.Event;
import com.task.cmvInternTask.entity.Notice;
import com.task.cmvInternTask.entity.dtos.NoticeResponse;

import java.util.ArrayList;
import java.util.List;

public class NoticeFactory implements  EventFactory{

    @Override
    public List<NoticeResponse> createNoticeResponse(List<Event> events) {

        List<NoticeResponse> noticeResponses=new ArrayList<>();

        events.forEach(event ->
        {
            if(event instanceof Notice)
            {
                NoticeResponse noticeResponse=new NoticeResponse();

                noticeResponse.setContent(event.getContent());
                noticeResponse.setImage(((Notice) event).getImage());
                noticeResponse.setTopic(event.getTopic());
                noticeResponse.setDateOfValidity(event.getDateOfValidity());
                noticeResponses.add(noticeResponse);
                
            }
            
        });

        return noticeResponses;




    }
}
