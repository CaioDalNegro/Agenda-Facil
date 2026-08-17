package br.com.agendafacil.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

// Record usado para receber
// os dados do login
public record LoginRequest(
        @NotBlank @Email String email,
        @NotBlank String password) {
}
