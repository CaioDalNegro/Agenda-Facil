package br.com.agendafacil.entity;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
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
    @GeneratedValue // Define que o valor será gerado automaticamente
    private UUID id;

    
    @Column(nullable = false) // Define que a coluna não pode ser nula
    @NotBlank(message = "Nome é obrigatório") // Validação para garantir que o nome não seja vazio
    private String name;

    @Column(nullable = true) // Define que a coluna pode ser nula
    @NotBlank(message = "Email é obrigatório") // Validação para garantir que o email não seja vazio
    @Email(message = "Email inválido") // Validação para garantir que o email seja válido
    private String email;

    @Column(nullable = true) // Define que a coluna pode ser nula
    @NotBlank(message = "Telefone é obrigatório") // Validação para garantir que o telefone não seja vazio
    private String phone;

    @Column(nullable = true) // Define que a coluna pode ser nula
    @NotBlank(message = "Senha é obrigatória") // Validação para garantir que a senha não seja vazia
    private String password;

    @Column(nullable = true) // Define que a coluna pode ser nula
    private String specialty;
}
