package br.com.agendafacil.security;

import java.util.Date;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;

@Service // Marca como Service do Spring
public class JwtService {

    // A chave de assinatura vem do ambiente e não é versionada no código.
    private final SecretKey secretKey;

    public JwtService(@Value("${app.jwt.secret}") String secret) {
        // Exige uma chave longa para HS256 e interrompe a inicialização se ela for insegura.
        if (secret == null || secret.getBytes(StandardCharsets.UTF_8).length < 32) {
            throw new IllegalStateException("JWT_SECRET must have at least 32 characters");
        }
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

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
                .signWith(secretKey, SignatureAlgorithm.HS256) // Assinatura token
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
        return Jwts.parserBuilder()
                .setSigningKey(secretKey) // Define chave secreta
                .build()
                .parseClaimsJws(token) // Faz parse token
                .getBody(); // Retorna body token
    }
}
