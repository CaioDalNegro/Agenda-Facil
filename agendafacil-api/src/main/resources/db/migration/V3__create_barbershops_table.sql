CREATE TABLE barbershops (
    -- ID único da barbearia
    id UUID PRIMARY KEY,

    -- Nome da barbearia
    name VARCHAR(100) NOT NULL,

    -- Endereço
    address VARCHAR(255),

    -- Telefone
    phone VARCHAR(20),

    -- Dono da barbearia
    owner_id UUID NOT NULL,

    -- Data de criação
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Chave estrangeira para users
    CONSTRAINT fk_barbershop_owner
        FOREIGN KEY (owner_id)
        REFERENCES users(id)
);