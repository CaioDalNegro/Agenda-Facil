package br.com.agendafacil.dto;

// Record usado para receber
// os dados do barbeiro
public record BarberRequest(
        String name,
        String specialty
){}