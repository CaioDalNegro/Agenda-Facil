package br.com.agendafacil.validation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

// Anotação para validar o número máximo de bytes em UTF-8
@Documented // Indica que a anotação deve ser incluída na documentação do JavaDoc
@Constraint(validatedBy = MaxUtf8BytesValidator.class) // Especifica a classe que implementa a lógica de validação
@Target({ ElementType.FIELD, ElementType.PARAMETER, ElementType.RECORD_COMPONENT }) // Define os elementos de destino da anotação (campos, parâmetros e componentes de registro)
@Retention(RetentionPolicy.RUNTIME) // Indica que a anotação estará disponível em tempo de execução
public @interface MaxUtf8Bytes {

    String message() default "deve possuir no máximo {value} bytes em UTF-8"; // Mensagem de erro padrão que será exibida quando a validação falhar

    Class<?>[] groups() default {}; // Define os grupos de validação aos quais a anotação pertence (padrão é um array vazio)

    Class<? extends Payload>[] payload() default {}; // Define os tipos de carga útil que podem ser associados à anotação (padrão é um array vazio)

    int value(); // Define o valor máximo de bytes em UTF-8 permitido para o campo ou parâmetro anotado
}
