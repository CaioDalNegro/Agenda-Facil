package br.com.agendafacil.dto;

// Record usado para receber
// os dados do login
public record LoginRequest(
        String email,
        String password) {
}