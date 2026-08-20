package br.com.agendafacil.dto;

import java.util.UUID;

// Record usado para retornar
// os dados do barbeiro
public record BarberResponse(
        UUID id, // Identificador único do barbeiro
        String name, // Nome do barbeiro
        String specialty // Especialidade do barbeiro
) {
    
}
