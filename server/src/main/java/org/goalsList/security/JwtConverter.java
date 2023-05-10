package org.goalsList.security;


import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.goalsList.models.AppUser;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtConverter {
    private Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final String ISSUER = "goalsList";
    private final int EXPIRATION_MINUTES = 2000;
    private final int EXPIRATION_MILLIS = EXPIRATION_MINUTES * 60 * 1000;

    public String getTokenFromUser(AppUser user){
        String authorities = user.getAuthorities().stream()
                .map(x -> x.getAuthority())
                .collect(Collectors.joining(","));
        return Jwts.builder()
                .setIssuer(ISSUER)
                .setSubject(user.getUsername())
                .claim("app_user_id", user.getAppUserId())
                .claim("authorities", authorities)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MILLIS))
                .signWith(key)
                .compact();
    }
    public AppUser getUserFromToken(String token){
        if(token == null || !token.startsWith("Bearer ")) {
            return null;
        }
        try{
            Jws<Claims> jws = Jwts.parserBuilder()
                    .requireIssuer(ISSUER)
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token.substring(7));

            String username = jws.getBody().getSubject();
            int appUserId = (int) jws.getBody().get("app_user_id");
            String authStr = (String) jws.getBody().get("authorities");

            AppUser newUser = new AppUser(appUserId, username, null, true, Arrays.asList(authStr.split(",")));

            return newUser;
        } catch (JwtException ex){
            System.out.println(ex);
        }
            return null;
    }
}



