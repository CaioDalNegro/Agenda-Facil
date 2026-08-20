package br.com.agendafacil.dto;

import br.com.agendafacil.enums.Role;

// Record usado para retornar
// os dados do usuario
public record UserResponse(
        String name, // Nome do usuário
        String email, // Email do usuário
        Role role // Papel do usuário (ex: ADMIN, USER)
) {
}