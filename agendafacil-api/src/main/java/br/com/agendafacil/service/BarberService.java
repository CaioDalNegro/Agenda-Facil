package br.com.agendafacil.service;

import java.util.List;
import org.springframework.stereotype.Service;
import br.com.agendafacil.dto.BarberRequest;
import br.com.agendafacil.entity.Barber;
import br.com.agendafacil.repository.BarberRepository;
import lombok.RequiredArgsConstructor;

@Service                    // Informa ao Spring que esta classe contém regras de negócio
@RequiredArgsConstructor    // Gera automaticamente o construtor para injeção de dependência
public class BarberService {

    // Repository utilizado para salvar e buscar barbeiros
    private final BarberRepository repository;

    // Método para cadastrar barbeiro ======================>
    public Barber create(BarberRequest request) {

        // Cria um novo objeto Barber usando Builder Pattern
        Barber barber = Barber.builder()

                // Define o nome recebido da requisição
                .name(request.name())

                // Define a especialidade recebida da requisição
                .specialty(request.specialty())

                // Finaliza a construção do objeto
                .build();

        // Salva o barbeiro no banco de dados
        // e retorna o objeto salvo
        return repository.save(barber);
    }

    // Método para listar barbeiros ======================>
    public List<Barber> findAll() {

        // Busca todos os registros da tabela barbers
        return repository.findAll();
    }
}