package org.acme.security;



import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.Set;

@ApplicationScoped
public class JwtService {

    public String generateToken(String username, String role) {
        return Jwt.issuer("smart-library")
                .subject(username)
                .groups(java.util.Collections.singleton(role))
                .expiresIn(56000)
                .sign();
    }
}

