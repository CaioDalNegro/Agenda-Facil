package br.com.agendafacil.controller;

import br.com.agendafacil.dto.UserResponse;
import br.com.agendafacil.entity.User;
import br.com.agendafacil.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController // Anotação para indicar que esta classe é um controlador REST do Spring
@RequestMapping("/users") // Define o caminho base para os endpoints deste controlador
@RequiredArgsConstructor // Anotação do Lombok que gera um construtor com argumentos para todos os campos finais
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