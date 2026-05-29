package br.com.agendafacil.security;

import java.util.Optional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import br.com.agendafacil.entity.User;
import br.com.agendafacil.repository.UserRepository;

@Service // Define essa classe como um Service gerenciado pelo Spring
public class CustomUserDetailsService implements UserDetailsService {

    // Repositório responsável por acessar usuários no banco
    private final UserRepository userRepository;

    /*
     * Injeção de dependência via construtor.
     */
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /*
     * Método obrigatório da interface UserDetailsService.
     *
     * O Spring Security chama esse método automaticamente
     * durante o processo de autenticação.
     */
    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        /*Busca usuário pelo email.*/
        Optional<User> user = userRepository.findByEmail(email);

        /*Se não encontrar usuário: lança exceção.*/
        if (user.isEmpty()) {
            throw new UsernameNotFoundException(
                    "Usuário não encontrado"
            );
        }

        /*Retorna o usuário encontrado.*/
        return user.get();
    }
}