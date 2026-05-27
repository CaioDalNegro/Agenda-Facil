package br.com.agendafacil.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.agendafacil.dto.AuthResponse;
import br.com.agendafacil.dto.LoginRequest;
import br.com.agendafacil.dto.RegisterRequest;
import br.com.agendafacil.entity.User;
import br.com.agendafacil.enums.Role;
import br.com.agendafacil.repository.UserRepository;
import br.com.agendafacil.security.JwtService;
import lombok.RequiredArgsConstructor;


@Service // Marca como Service do Spring
@RequiredArgsConstructor // Cria construtor automático
public class AuthService {

    private final UserRepository repository; // Repository usuário
    private final PasswordEncoder passwordEncoder; // Criptografa senha
    private final JwtService jwtService; // Serviço JWT
    private final AuthenticationManager authenticationManager; // Responsável pela autenticação

    // Método cadastro------------------------------------------->
    public AuthResponse register(RegisterRequest request) {

        // Cria usuário usando Builder
        User user = User.builder()
                .name(request.name()) // Nome vindo do request
                .email(request.email()) // Email vindo do request
                .password(passwordEncoder.encode(request.password())) // Criptografa senha
                .role(Role.CLIENT) // Define role padrão
                .build(); // Finaliza construção

        // Salva usuário banco
        repository.save(user);
        String token = jwtService.generateToken(user); // Gera token JWT
        return new AuthResponse(token); // Retorna token
    }

    // Método de login-------------------------------------------->
    public AuthResponse login(LoginRequest request) {

        // Autentica usuário
        authenticationManager.authenticate(
                // Cria objeto autenticação
                new UsernamePasswordAuthenticationToken(
                        request.email(), // Email enviado
                        request.password() // Senha enviada
                )
        );

        User user = repository.findByEmail(request.email()).orElseThrow(); // Busca usuário banco
        String token = jwtService.generateToken(user); // Gera token JWT
        return new AuthResponse(token); // Retorna token
    }
}