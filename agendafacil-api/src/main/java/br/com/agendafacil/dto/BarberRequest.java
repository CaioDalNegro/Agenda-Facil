package br.com.agendafacil.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// Record usado para receber
// os dados do barbeiro
public record BarberRequest(
        @NotBlank @Size(max = 100) String name,
        @NotBlank @Email @Size(max = 150) String email,
        @NotBlank @Size(max = 50) String phone,
        @NotBlank @Size(min = 8, max = 72) String password,
        @NotBlank @Size(max = 100) String specialty
){}
