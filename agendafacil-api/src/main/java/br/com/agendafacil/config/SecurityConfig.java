package br.com.agendafacil.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration // Define que essa classe é uma configuração do Spring
public class SecurityConfig {

    /*
     * Bean responsável por fornecer um PasswordEncoder para o sistema.
     *
     * Sempre que alguma classe precisar de PasswordEncoder, Spring entregará essa implementação.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); //BCryptPasswordEncoder: cuida da parte de Criptografia de senhas
    }

    /*
     * AuthenticationManager - utilizado no processo de login.
     */
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager(); //Retorna o AuthenticationManager configurado automaticamente pelo Spring.
    }

    /*
     * Configuração principal da segurança.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth                 //Configura permissões das rotas.
                        .requestMatchers("/auth/**").permitAll()    //Libera todas as rotas /auth/**
                        .anyRequest().authenticated());             // Qualquer outra rota precisa autenticação.
        return http.build();                                        // Retorna configuração pronta.
    }
}