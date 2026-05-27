package br.com.agendafacil.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.agendafacil.enums.Role;

@Entity // Define que essa classe é uma entidade do banco de dados
@Table(name = "users") // Define o nome da tabela no banco

@Getter // Gera automaticamente os getters
@Setter // Gera automaticamente os setters
@NoArgsConstructor // Gera construtor vazio
@AllArgsConstructor // Gera construtor com todos os atributos
@Builder // Permite usar o padrão Builder
public class User implements UserDetails {

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

    // Executa automaticamente antes de salvar no banco
    @PrePersist
    protected void onCreate() {
        // Define a data atual automaticamente
        this.createdAt = LocalDateTime.now();
    }

    // --- UserDetails ---
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getUsername() {
        return email; // Spring Security usa isso como identificador único
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }

}