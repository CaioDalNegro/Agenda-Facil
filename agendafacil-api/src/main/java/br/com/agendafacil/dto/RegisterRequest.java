package br.com.agendafacil.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import br.com.agendafacil.validation.MaxUtf8Bytes;

// Record usado para receber os dados
// enviados no cadastro do usuário
public record RegisterRequest(
        @NotBlank @Size(max = 100) String name, // Validação para garantir que o nome não seja vazio e tenha no máximo 100 caracteres
        @NotBlank @Email @Size(max = 150) String email, // Validação para garantir que o email não seja vazio, seja um email válido e tenha no máximo 150 caracteres
        @NotBlank @Size(min = 8, message = "A senha deve ter pelo menos 8 caracteres.") // Validação para garantir que a senha não seja vazia e tenha no mínimo 8 caracteres
        @MaxUtf8Bytes(value = 72, message = "A senha é muito longa.") String password) { // Validação personalizada para garantir que a senha não tenha mais de 72 bytes em UTF-8
}
