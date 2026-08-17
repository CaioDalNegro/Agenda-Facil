package br.com.agendafacil.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record BarbershopResponse(
        UUID id,
        String name,
        String email,
        String phone,
        String address,
        String city,
        String state,
        String description,
        UUID ownerId,
        LocalDateTime createdAt) {
}
