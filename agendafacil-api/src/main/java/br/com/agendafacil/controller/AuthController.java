package br.com.agendafacil.controller;

import br.com.agendafacil.dto.*;
import br.com.agendafacil.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController // Define classe como Controller REST
@RequestMapping("/auth") // Define rota base
@RequiredArgsConstructor // Cria construtor automático
public class AuthController {

    // Injeta AuthService
    private final AuthService service;

    // Cadastro ------------------------->
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request)); // Retorna resposta cadastro
    }

    // Login ----------------------------->
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(service.login(request)); // Retorna token login
    }
}