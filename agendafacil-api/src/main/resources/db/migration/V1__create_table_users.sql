CREATE TABLE users (

    -- ID único
    id UUID PRIMARY KEY,

    -- Nome do usuário
    name VARCHAR(100) NOT NULL,

    -- Email único
    email VARCHAR(150) UNIQUE NOT NULL,

    -- Senha criptografada
    password VARCHAR(255) NOT NULL,

    -- Role do usuário
    role VARCHAR(30) NOT NULL,

    -- Data criação
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);