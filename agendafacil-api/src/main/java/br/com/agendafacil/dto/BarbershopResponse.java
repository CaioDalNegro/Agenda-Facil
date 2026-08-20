package br.com.agendafacil.dto;

import java.time.LocalDateTime;
import java.util.UUID;

// Record usado para retornar
// os dados da barbearia
public record BarbershopResponse(
        UUID id, // Identificador único da barbearia
        String name, // Nome da barbearia
        String email, // Email da barbearia
        String phone, // Telefone da barbearia
        String address, // Endereço da barbearia
        String city, // Cidade da barbearia
        String state, // Estado da barbearia
        String description, // Descrição da barbearia
        UUID ownerId, // Identificador único do proprietário da barbearia
        LocalDateTime createdAt) { // Data e hora de criação da barbearia
}
