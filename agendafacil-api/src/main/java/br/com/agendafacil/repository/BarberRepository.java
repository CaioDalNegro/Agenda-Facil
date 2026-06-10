package br.com.agendafacil.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import br.com.agendafacil.entity.Barber;

public interface BarberRepository extends JpaRepository<Barber, UUID> {
}