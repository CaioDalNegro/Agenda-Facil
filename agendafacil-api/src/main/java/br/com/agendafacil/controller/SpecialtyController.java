package br.com.agendafacil.controller;

import br.com.agendafacil.dto.SpecialtyResponse;
import br.com.agendafacil.service.SpecialtyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Anotação para indicar que esta classe é um controlador REST do Spring
@RequestMapping("/specialties") // Define o caminho base para os endpoints deste controlador
@RequiredArgsConstructor // Anotação do Lombok que gera um construtor com argumentos para todos os campos finais
@CrossOrigin("*") // Permite requisições de qualquer origem (útil para desenvolvimento front-end)
public class SpecialtyController {

    private final SpecialtyService service; // Serviço de especialidades, injetado pelo Spring

    @GetMapping // Define que este método responde a requisições GET no caminho "/specialties"
    public List<SpecialtyResponse> findAll() {
        return service.findAll();
    }

}