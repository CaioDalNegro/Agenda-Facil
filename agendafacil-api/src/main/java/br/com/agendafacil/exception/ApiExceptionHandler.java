package br.com.agendafacil.exception;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice // Anotação que indica que esta classe é um manipulador de exceções para controladores REST
public class ApiExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class) // Anotação que indica que este método deve ser chamado quando uma exceção do tipo MethodArgumentNotValidException for lançada
    public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException exception) {
        String message = exception.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(error -> error.getDefaultMessage())
                .orElse("Dados inválidos.");

        return ResponseEntity.badRequest().body(Map.of("message", message));
    }
}
