package br.com.agendafacil.entity;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity // Define que essa classe é uma entidade do banco de dados
@Table(name = "barbers") // Define o nome da tabela no banco
public class Barber {

    @Id // Define como chave primária da tabela
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Gera UUID automaticamente
    private UUID id;

    // Campo obrigatório
    @Column(nullable = false)
    private String name;

    // Campo obrigatório
    @Column(nullable = false)
    private String specialty;
}
