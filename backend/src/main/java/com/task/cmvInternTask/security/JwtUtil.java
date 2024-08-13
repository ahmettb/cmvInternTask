package com.task.cmvInternTask.security;

import com.task.cmvInternTask.entity.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class JwtUtil {
    private final String secret = "mySuperSex12312312x312cretKey12321321312321312312334567890";
    private static final SecretKey key = Keys.hmacShaKeyFor("mySuperSex12312312x312cretKey12321321312321312312334567890".getBytes());

    public static String generateToken(Authentication auth,Set<Role>roles) {

        List<String> roleNames = roles.stream()
                .map(role -> role.getRole().toString())
                .collect(Collectors.toList());

        Map<String, Object> rolesClaim = new HashMap<>();
        rolesClaim.put("roles", roleNames);



        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();

        return Jwts.builder()
                .setSubject(auth.getName())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 86400000))
                .claim("authorities", rolesClaim)
                .signWith(key)
                .compact();
    }



    public static Set<String> getRoleNamesFromToken(String token) {
        Claims claims = getAllClaimsFromToken(token);
        Object authoritiesObj = claims.get("authorities");

        if (authoritiesObj instanceof LinkedHashMap) {
            LinkedHashMap<String, ?> authoritiesMap = (LinkedHashMap<String, ?>) authoritiesObj;
            return authoritiesMap.values().stream()
                    .map(Object::toString)
                    .collect(Collectors.toSet());
        } else {
            throw new RuntimeException("Invalid authorities format in token");
        }
    }

    public Boolean validateToken(String token, String username) {
        final String tokenUsername = getUsernameFromToken(token);
        return (tokenUsername.equals(username) && !isTokenExpired(token));
    }

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private static Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()

                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
}
