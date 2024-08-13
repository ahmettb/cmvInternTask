package com.task.cmvInternTask.repository;

import com.task.cmvInternTask.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface IRoleRepository extends JpaRepository<Role,Long> {
    //Role findByName(String name);
}
