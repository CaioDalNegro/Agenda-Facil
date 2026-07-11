package br.com.agendafacil.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.agendafacil.dto.SpecialtyResponse;
import br.com.agendafacil.repository.SpecialtyRepository;
import lombok.RequiredArgsConstructor;

@Service // Anotação para indicar que esta classe é um serviço do Spring
@RequiredArgsConstructor // Anotação do Lombok que gera um construtor com argumentos para todos os campos finais
public class SpecialtyService {

    private final SpecialtyRepository repository; // Repositório de especialidades, injetado pelo Spring

    // Método para buscar todas as especialidades e convertê-las em objetos SpecialtyResponse
    public List<SpecialtyResponse> findAll() {
        return repository.findAll()
                .stream()
                .map(s -> new SpecialtyResponse(
                        s.getId(),
                        s.getName()
                ))
                .toList();
    }
}