package br.com.agendafacil.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component // Define que essa classe é um componente do Spring, permitindo que seja injetada em outros lugares
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService; // Serviço responsável por lidar com operações relacionadas ao JWT (JSON Web Token)
    private final CustomUserDetailsService userDetailsService; // Serviço responsável por carregar os detalhes do usuário a partir do banco de dados

    // Construtor da classe JwtAuthenticationFilter, que recebe como parâmetros os serviços JwtService e CustomUserDetailsService.
    public JwtAuthenticationFilter(JwtService jwtService, CustomUserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override // Sobrescreve o método doFilterInternal da classe OncePerRequestFilter, que é chamado para cada requisição HTTP recebida pelo servidor.
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization"); // Obtém o valor do cabeçalho "Authorization" da requisição HTTP, que geralmente contém o token JWT enviado pelo cliente.
        final String prefix = "Bearer "; // Define o prefixo esperado no cabeçalho "Authorization". O token

        // JWT deve ser precedido por "Bearer " para indicar que é um token de autenticação.
        if (authHeader == null || !authHeader.startsWith(prefix)) {
            filterChain.doFilter(request, response);
            return;
        }

        final String token = authHeader.substring(prefix.length()); // Extrai o token JWT do cabeçalho "Authorization", removendo o prefix
        String username;
        try {
            username = jwtService.extractUsername(token);
        } catch (Exception e) {
            filterChain.doFilter(request, response);
            return;
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (jwtService.isTokenValid(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
