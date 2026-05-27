package br.com.agendafacil.security;

import java.util.Date;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service // Marca como Service do Spring
public class JwtService {

    // Chave secreta do token
    private static final String SECRET_KEY = "minha-chave-super-secreta";

    // Gera Token do JWT----------------------------->
    public String generateToken(UserDetails user) {

        return Jwts.builder()
                .setSubject(user.getUsername()) // Define usuário dono token
                .setIssuedAt(new Date()) // Data criação token

                // Data expiração token
                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000 * 60 * 60 * 24
                        )
                )
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // Assinatura token
                .compact(); // Finaliza token
    }

    // Extrai email token---------------------------->
    public String extractUsername(String token) {
        return extractAllClaims(token)
                .getSubject();
    }

    // Valida token---------------------------------->
    public boolean isTokenValid(
            String token,
            UserDetails user
    ) {
        final String username = extractUsername(token);
        return username.equals(user.getUsername());
    }

    // EXTRAI CLAIMS TOKEN--------------------------->
    private Claims extractAllClaims(
            String token
    ) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY) // Define chave secreta
                .parseClaimsJws(token) // Faz parse token
                .getBody(); // Retorna body token
    }
}