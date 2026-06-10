package br.com.agendafacil.dto;

import java.util.UUID;

// Record usado para retornar
// os dados do barbeiro
public record BarberResponse(
        UUID id,
        String name,
        String specialty
) {
    
}
