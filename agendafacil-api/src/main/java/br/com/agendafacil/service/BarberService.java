package br.com.agendafacil.service;

import java.util.List;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import br.com.agendafacil.dto.BarberRequest;
import br.com.agendafacil.dto.BarberResponse;
import br.com.agendafacil.entity.Barber;
import br.com.agendafacil.repository.BarberRepository;
import lombok.RequiredArgsConstructor;

@Service                    // Informa ao Spring que esta classe contém regras de negócio
@RequiredArgsConstructor    // Gera automaticamente o construtor para injeção de dependência
public class BarberService {

    // Repository utilizado para salvar e buscar barbeiros
    private final BarberRepository repository;
    private final PasswordEncoder passwordEncoder;

    // Método para cadastrar barbeiro ======================>
    public BarberResponse create(BarberRequest request) {

        // Cria um novo objeto Barber usando Builder Pattern
        Barber barber = Barber.builder()

                // Define o nome recebido da requisição
                .name(request.name())

                // Define os dados de contato recebidos da requisição
                .email(request.email())
                .phone(request.phone())
                .password(passwordEncoder.encode(request.password()))

                // Define a especialidade recebida da requisição
                .specialty(request.specialty())

                // Finaliza a construção do objeto
                .build();

        // Salva o barbeiro no banco de dados
        // e retorna o objeto salvo
        // Retorna um DTO para não expor a senha criptografada.
        return toResponse(repository.save(barber));
    }

    // Método para listar barbeiros ======================>
    public List<BarberResponse> findAll() {

        // Busca todos os registros da tabela barbers
        // Usa o mesmo DTO para evitar a exposição acidental de dados sensíveis.
        return repository.findAll().stream().map(this::toResponse).toList();
    }

    private BarberResponse toResponse(Barber barber) {
        return new BarberResponse(barber.getId(), barber.getName(), barber.getSpecialty());
    }
}
