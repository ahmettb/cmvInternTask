package com.task.cmvInternTask.security;

import com.task.cmvInternTask.service.UserDetailService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static String secretKey = "supersecretkey23esdfoı43jıfjref9wj4ewıcıdc98oıdsfjıodsfj8943";


    @Autowired
    private  JwtUtil jwtUtil;
    @Autowired

    private  UserDetailService userDetailService;




    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        String jwt = request.getHeader("Authorization");
        if (jwt != null && jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);


            try {

                String username = jwtUtil.getUsernameFromToken(jwt);
                jwtUtil.validateToken(jwt,username);

                UserDetails userDetails = userDetailService.loadUserByUsername(username);

                Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);


            } catch (Exception e) {
                throw new BadCredentialsException("Invalid token", e);
            }


        }


        chain.doFilter(request, response);

    }
}

