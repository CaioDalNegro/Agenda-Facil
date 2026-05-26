package br.com.agendafacil.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.agendafacil.entity.User;

import java.util.Optional;
import java.util.UUID;

// Interface responsável pelo acesso ao banco de dados da entidade User
public interface UserRepository extends JpaRepository<User, UUID> {

    /*
     * Método para buscar um usuário pelo email.
     *
     * O Spring Data JPA cria automaticamente a query:
     * SELECT * FROM users WHERE email = ?
     */
    Optional<User> findByEmail(String email);
}