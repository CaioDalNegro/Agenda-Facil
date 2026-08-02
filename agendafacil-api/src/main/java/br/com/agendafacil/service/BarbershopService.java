package br.com.agendafacil.service;

import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.access.AccessDeniedException;

import br.com.agendafacil.dto.BarbershopRequest;
import br.com.agendafacil.entity.Barbershop;
import br.com.agendafacil.entity.User;
import br.com.agendafacil.repository.BarbershopRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BarbershopService {

    private final BarbershopRepository repository;

    public Barbershop create(BarbershopRequest dto) {

        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof User)) {
            throw new AccessDeniedException("Usuário deve estar autenticado para criar uma barbearia");
        }

        User owner = (User) auth.getPrincipal();

        Barbershop shop = Barbershop.builder()
                .name(dto.name())
                .email(dto.email())
                .phone(dto.phone())
                .address(dto.address())
                .city(dto.city())
                .state(dto.state())
                .description(dto.description())
                .owner(owner)
                .build();

        return repository.save(shop);
    }
}