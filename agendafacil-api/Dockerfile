# Usa imagem Java 21
FROM eclipse-temurin:21-jdk

# Define pasta interna
WORKDIR /app

# Copia projeto
COPY . .

# Permite executar Maven Wrapper
RUN chmod +x mvnw

# Gera arquivo .jar
RUN ./mvnw clean package -DskipTests

# Expõe porta da API
EXPOSE 8080

# Executa aplicação
CMD ["java", "-jar", "target/agendafacil-0.0.1-SNAPSHOT.jar"]