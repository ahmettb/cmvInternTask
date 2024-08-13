package com.task.cmvInternTask.factory;

import com.task.cmvInternTask.entity.Event;
import com.task.cmvInternTask.entity.News;
import com.task.cmvInternTask.entity.Notice;

import java.util.function.Predicate;

public class EventFilterFactory {



    public static Predicate<Event>createFilter(String type)
    {
        if(type.equals("News"))
        {
            return  event -> event instanceof  News;
        }
        else {
            return  event -> event instanceof Notice;

        }
    }
}
