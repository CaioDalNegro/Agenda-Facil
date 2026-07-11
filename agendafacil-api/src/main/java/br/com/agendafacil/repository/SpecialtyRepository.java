package br.com.agendafacil.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.agendafacil.entity.Specialty;

// Interface responsável pelo acesso ao banco de dados da entidade Specialty
public interface SpecialtyRepository extends JpaRepository<Specialty, UUID> {
}