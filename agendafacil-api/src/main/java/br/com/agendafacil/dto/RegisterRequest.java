package br.com.agendafacil.dto;

// Record usado para receber os dados
// enviados no cadastro do usuário
public record RegisterRequest(
        String name,
        String email,
        String password) {
}