package br.com.agendafacil.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.agendafacil.dto.BarbershopRequest;
import br.com.agendafacil.dto.BarbershopResponse;
import br.com.agendafacil.service.BarbershopService;
import lombok.RequiredArgsConstructor;

@RestController // Anotação para indicar que esta classe é um controlador REST do Spring
@RequestMapping("/barbershops") // Define o caminho base para os endpoints deste controlador
@RequiredArgsConstructor // Anotação do Lombok que gera um construtor com argumentos para todos os campos finais
public class BarbershopController {

    private final BarbershopService service; // Serviço de barbearias, injetado pelo Spring

    // Cadastro ------------------------->
    @PostMapping
    public ResponseEntity<BarbershopResponse> create(
            @jakarta.validation.Valid @RequestBody BarbershopRequest request){

        return ResponseEntity.ok(service.create(request));
    }

}
