package com.task.cmvInternTask.factory;

import com.task.cmvInternTask.entity.Event;
import com.task.cmvInternTask.entity.Notice;
import com.task.cmvInternTask.entity.dtos.NoticeResponse;

import java.util.ArrayList;
import java.util.List;

public interface EventFactory {

    List<NoticeResponse>  createNoticeResponse(List<Event> events);

}

