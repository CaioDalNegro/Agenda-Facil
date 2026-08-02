package br.com.agendafacil.dto;

public record BarbershopRequest(
    String name,
    String ownerName,
    String email,
    String phone,
    String address,
    String city,
    String state,
    String description
) {
}