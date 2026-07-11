package br.com.agendafacil.dto;

import br.com.agendafacil.enums.Role;

// Record usado para retornar
// os dados do usuario
public record UserResponse(
        String name,
        String email,
        Role role
) {
}