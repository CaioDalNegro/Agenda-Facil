package br.com.agendafacil.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    private UUID id;
    private String name;

    @Column(unique = true)
    private String email;
    private String password;
    private String role;
    private LocalDateTime createdAt;
}