package br.com.agendafacil.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity // Define que essa classe é uma entidade do banco de dados
@Table(name = "barbershops") // Define o nome da tabela no banco
@Getter // Gera automaticamente os getters
@Setter // Gera automaticamente os setters
@NoArgsConstructor // Gera construtor vazio
@AllArgsConstructor // Gera construtor com todos os atributos
@Builder // Permite usar o padrão Builder
public class Barbershop {

    @Id // Define como chave primária da tabela
    @GeneratedValue(strategy = GenerationType.UUID) // Define que o valor será gerado automaticamente como UUID
    private UUID id;

    @Column(nullable = false, length = 100) // Define que a coluna não pode ser nula e define o tamanho máximo
    private String name;

    @Column(length = 150, unique = true) // Define o tamanho máximo e que o valor deve ser único
    private String email;

    @Column(length = 20) // Define o tamanho máximo
    private String phone;

    @Column(length = 255) // Define o tamanho máximo
    private String address;

    @Column(length = 100) // Define o tamanho máximo
    private String city;

    @Column(length = 2) // Define o tamanho máximo para o estado (UF)
    private String state;

    @Column(length = 1000) // Define o tamanho máximo para a descrição
    private String description;

    @CreationTimestamp // Define que o valor será gerado automaticamente com a data e hora atual
    @Column(name = "created_at", nullable = false, updatable = false) // Define que a coluna não pode ser nula e não pode ser atualizada
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY) // Define o relacionamento Many-to-One com a entidade User, carregando os dados de forma preguiçosa
    @JoinColumn(name = "owner_id", nullable = false) // Define a coluna que será usada para o relacionamento e que não pode ser nula
    private User owner;

}