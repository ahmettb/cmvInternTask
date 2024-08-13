package com.task.cmvInternTask.service;

import com.task.cmvInternTask.entity.JwtAuthResponse;
import com.task.cmvInternTask.entity.Role;
import com.task.cmvInternTask.entity.User;
import com.task.cmvInternTask.entity.dtos.LoginRequest;
import com.task.cmvInternTask.repository.IUserRepository;
import com.task.cmvInternTask.security.JwtUtil;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class UserService {


    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserDetailService userDetailService;


    private final JwtUtil jwtUtil;


    public User findByUsername(String username) {
        User user = userRepository.findAll().stream().filter(user1 -> user1.getUsername().
                equals(username)).findFirst().orElseThrow(() -> new UsernameNotFoundException(""));


        return user;

    }

    public JwtAuthResponse login(LoginRequest loginRequest) {


        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();

        User user = findByUsername(loginRequest.getUsername());

        if (user != null) {
            String username = loginRequest.getUsername();
            String password = loginRequest.getPassword();

            Authentication authentication = authenticate(username, password);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtUtil.generateToken(authentication, user.getRoles());
            Set<String> roles = JwtUtil.getRoleNamesFromToken(token);

            jwtAuthResponse.setJwtToken(token);
            jwtAuthResponse.setRoles(roles);

            return jwtAuthResponse;

        }

        return jwtAuthResponse;


    }


    private Authentication authenticate(String username, String password) {


        UserDetails userDetails = userDetailService.loadUserByUsername(username);


        if (userDetails == null) {
            System.out.println("Sign in details - null" + userDetails);

            throw new BadCredentialsException("Invalid username and password");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            System.out.println("Sign in userDetails - password mismatch" + userDetails);

            throw new BadCredentialsException("Invalid password");

        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

    }


}



