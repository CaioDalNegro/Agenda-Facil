package br.com.agendafacil.dto;

import br.com.agendafacil.enums.Role;

// Record usado para receber os dados
// enviados no cadastro do usuário
public record RegisterRequest(
        String name,
        String email,
        String password,
        Role role) {
}