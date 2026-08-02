package br.com.agendafacil.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.agendafacil.dto.BarbershopRequest;
import br.com.agendafacil.entity.Barbershop;
import br.com.agendafacil.service.BarbershopService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/barbershops")
@RequiredArgsConstructor
public class BarbershopController {

    private final BarbershopService service;

    @PostMapping
    public ResponseEntity<Barbershop> create(
            @RequestBody BarbershopRequest request){

        return ResponseEntity.ok(service.create(request));
    }

}
