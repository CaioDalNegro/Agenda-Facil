package br.com.agendafacil.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

// Record usado para receber
// os dados da barbearia
public record BarbershopRequest(
    @NotBlank @Size(max = 100) String name, // Validação para garantir que o nome não seja vazio e tenha no máximo 100 caracteres
    @Email @Size(max = 150) String email, // Validação para garantir que o email seja um email válido e tenha no máximo 150 caracteres
    @Size(max = 20) String phone, // Validação para garantir que o telefone tenha no máximo 20 caracteres
    @Size(max = 255) String address, // Validação para garantir que o endereço tenha no máximo 255 caracteres
    @Size(max = 100) String city, // Validação para garantir que a cidade tenha no máximo 100 caracteres
    @Pattern(regexp = "[A-Z]{2}", message = "Estado deve conter a sigla de duas letras") String state, // Validação para garantir que o estado seja uma sigla de duas letras
    @Size(max = 1000) String description // Validação para garantir que a descrição tenha no máximo 1000 caracteres
) {
}
