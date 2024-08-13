package com.task.cmvInternTask.repository;

import com.task.cmvInternTask.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEventRepository extends JpaRepository<Event,Long> {
}
