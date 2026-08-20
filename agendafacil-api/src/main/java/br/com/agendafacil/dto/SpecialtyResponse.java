package br.com.agendafacil.dto;

import java.util.UUID;

// Record usado para retornar
// os dados da especialidade
public record SpecialtyResponse(
        UUID id, // Identificador único da especialidade
        String name // Nome da especialidade
) {}