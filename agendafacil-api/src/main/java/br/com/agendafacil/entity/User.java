package br.com.agendafacil.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

import br.com.agendafacil.enums.Role;

@Entity // Define que essa classe é uma entidade do banco de dados
@Table(name = "users") // Define o nome da tabela no banco

@Getter // Gera automaticamente os getters
@Setter // Gera automaticamente os setters
@NoArgsConstructor // Gera construtor vazio
@AllArgsConstructor // Gera construtor com todos os atributos
@Builder // Permite usar o padrão Builder
public class User {

    @Id // Define como chave primária da tabela
    @GeneratedValue(strategy = GenerationType.UUID) // Gera UUID automaticamente
    private UUID id;

    // Campo obrigatório
    @Column(nullable = false)
    private String name;

    // Campo obrigatório e único no banco
    @Column(nullable = false, unique = true)
    private String email;

    // Campo obrigatório
    @Column(nullable = false)
    private String password;

    // Salva o enum como texto no banco
    // Campo obrigatório
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
    
    // Define que o campo não pode ser atualizado após ser criado
    @Column(updatable = false)
    private LocalDateTime createdAt;
}