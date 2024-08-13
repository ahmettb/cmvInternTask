package com.task.cmvInternTask.service;

import com.task.cmvInternTask.entity.User;
import com.task.cmvInternTask.repository.IUserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service


public class UserDetailService implements UserDetailsService {

    @Autowired
    IUserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow(()->new RuntimeException(""));

        if (user == null) {
            throw new UsernameNotFoundException("User not found with this email" + username);

        }

        SimpleGrantedAuthority userAuth=new SimpleGrantedAuthority(user.getRoles().stream().toList().getFirst().getRole().toString());


        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(userAuth);

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                authorities);
    }
}
