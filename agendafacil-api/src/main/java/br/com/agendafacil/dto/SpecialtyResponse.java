package br.com.agendafacil.dto;

import java.util.UUID;

// Record usado para retornar
// os dados da especialidade
public record SpecialtyResponse(
        UUID id,
        String name
) {}