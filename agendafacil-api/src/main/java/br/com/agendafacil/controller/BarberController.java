package br.com.agendafacil.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import br.com.agendafacil.dto.BarberRequest;
import br.com.agendafacil.entity.Barber;
import br.com.agendafacil.service.BarberService;
import lombok.RequiredArgsConstructor;


@RestController // Define esta classe como Controller REST

// URL base dos endpoints
// Todas as rotas começarão com /barbers
@RequestMapping("/barbers")
@RequiredArgsConstructor // Cria construtor automaticamente
public class BarberController {

    // Injeta o Service responsável pelas regras de negócio
    private final BarberService service;

    // Endpoint para cadastrar barbeiro ================>
    @PostMapping
    public Barber create(@RequestBody BarberRequest request) { // Recebe os dados enviados no corpo da requisição

        // Chama o método create do Service
        return service.create(request);
    }

    // Endipoint para listar barbeiros ==========>
    @GetMapping
    public List<Barber> findAll() {

        // Chama o Service e retorna todos os barbeiros
        return service.findAll();
    }
}