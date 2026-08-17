package br.com.agendafacil.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record BarbershopRequest(
    @NotBlank @Size(max = 100) String name,
    @Email @Size(max = 150) String email,
    @Size(max = 20) String phone,
    @Size(max = 255) String address,
    @Size(max = 100) String city,
    @Pattern(regexp = "[A-Z]{2}", message = "Estado deve conter a sigla de duas letras") String state,
    @Size(max = 1000) String description
) {
}
