package br.com.agendafacil.entity;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity // Define que essa classe é uma entidade do banco de dados
@Table(name = "barbers") // Define o nome da tabela no banco

@Getter // Gera automaticamente os getters
@Setter // Gera automaticamente os setters
@NoArgsConstructor // Gera construtor vazio
@AllArgsConstructor // Gera construtor com todos os atributos
@Builder // Permite usar o padrão Builder
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
