package br.com.agendafacil.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration // Define que essa classe é uma configuração do Spring
public class SecurityConfig {

    /*
     * Bean responsável por fornecer um PasswordEncoder para o sistema.
     *
     * Sempre que alguma classe precisar de PasswordEncoder, Spring entregará essa implementação.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {

        /*
         * BCryptPasswordEncoder: cuida da parte de Criptografia de senhas
         */
        return new BCryptPasswordEncoder();
    }

    /*
     * AuthenticationManager - utilizado no processo de login.
     */
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {

        /*
         * Retorna o AuthenticationManager configurado automaticamente pelo Spring.
         */
        return config.getAuthenticationManager();
    }
}