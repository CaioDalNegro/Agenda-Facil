package br.com.agendafacil.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.agendafacil.dto.BarberRequest;
import br.com.agendafacil.dto.BarberResponse;
import br.com.agendafacil.service.BarberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/barbers")
@RequiredArgsConstructor
public class BarberController {

    private final BarberService service;

    @PostMapping
    public BarberResponse create(@Valid @RequestBody BarberRequest request) {
        return service.create(request);
    }

    @GetMapping
    public List<BarberResponse> findAll() {
        return service.findAll();
    }
}
