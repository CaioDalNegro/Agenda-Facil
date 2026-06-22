package br.com.agendafacil.dto;

import br.com.agendafacil.enums.Role;

public record UserResponse(
        String name,
        String email,
        Role role
) {
}