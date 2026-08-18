package br.com.agendafacil.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import br.com.agendafacil.validation.MaxUtf8Bytes;

// Record usado para receber os dados
// enviados no cadastro do usuário
public record RegisterRequest(
        @NotBlank @Size(max = 100) String name,
        @NotBlank @Email @Size(max = 150) String email,
        @NotBlank @Size(min = 8, message = "A senha deve ter pelo menos 8 caracteres.")
        @MaxUtf8Bytes(value = 72, message = "A senha é muito longa.") String password) {
}
