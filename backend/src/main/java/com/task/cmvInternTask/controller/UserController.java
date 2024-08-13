package com.task.cmvInternTask.controller;

import com.task.cmvInternTask.entity.ERole;
import com.task.cmvInternTask.entity.JwtAuthResponse;
import com.task.cmvInternTask.entity.Role;
import com.task.cmvInternTask.entity.User;
import com.task.cmvInternTask.entity.dtos.LoginRequest;
import com.task.cmvInternTask.repository.IRoleRepository;
import com.task.cmvInternTask.repository.IUserRepository;
import com.task.cmvInternTask.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("api/auth")
@CrossOrigin(origins = "http://localhost:3000")

public class UserController {

    private final UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;

    }


    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginRequest loginRequest) {

        return new ResponseEntity<>(userService.login(loginRequest), HttpStatus.OK);

    }


}
