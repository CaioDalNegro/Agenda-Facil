package br.com.agendafacil.validation;

import java.nio.charset.StandardCharsets;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

// Classe que implementa a lógica de validação para a anotação @MaxUtf8Bytes
public class MaxUtf8BytesValidator implements ConstraintValidator<MaxUtf8Bytes, String> {

    private int maxBytes; // Variável para armazenar o valor máximo de bytes em UTF-8 permitido, definido na anotação @MaxUtf8Bytes

    // Método de inicialização do validador, onde o valor máximo de bytes é obtido da anotação @MaxUtf8Bytes
    @Override
    public void initialize(MaxUtf8Bytes constraint) {
        maxBytes = constraint.value();
    }

    // Método que realiza a validação do valor do campo ou parâmetro anotado com @MaxUtf8Bytes
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value == null || value.getBytes(StandardCharsets.UTF_8).length <= maxBytes;
    }
}
