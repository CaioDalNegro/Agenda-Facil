package br.com.agendafacil.controller;

import br.com.agendafacil.dto.UserResponse;
import br.com.agendafacil.entity.User;
import br.com.agendafacil.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository repository;

    // Retorna os dados do usuário autenticado
    @GetMapping("/me")
    public UserResponse me(Authentication authentication) {

        // Email contido no token JWT
        String email = authentication.getName();

        // Busca usuário no banco
        User user = repository.findByEmail(email)
                .orElseThrow();

        // Retorna somente os dados necessários
        return new UserResponse(
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}