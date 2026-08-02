package br.com.agendafacil.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.agendafacil.entity.Barbershop;

public interface BarbershopRepository extends JpaRepository<Barbershop, UUID>{
}
