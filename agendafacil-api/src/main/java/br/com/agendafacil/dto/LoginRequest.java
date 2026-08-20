package br.com.agendafacil.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

// Record usado para receber
// os dados do login
public record LoginRequest(
        @NotBlank @Email String email, // Validação para garantir que o email não seja vazio e seja um email válido
        @NotBlank String password) { // Validação para garantir que a senha não seja vazia
}
