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
@Table(name = "specialties")
@Getter // Gera automaticamente os getters
@Setter // Gera automaticamente os setters
@NoArgsConstructor // Gera construtor vazio
@AllArgsConstructor // Gera construtor com todos os atributos
@Builder // Permite usar o padrão Builder
public class Specialty {

    @Id // Define como chave primária da tabela
    @GeneratedValue(strategy = GenerationType.UUID) // Define que o valor será gerado automaticamente como UUID
    private UUID id;

    @Column(nullable = false, unique = true) // Define que o campo é obrigatório e único
    private String name;
}