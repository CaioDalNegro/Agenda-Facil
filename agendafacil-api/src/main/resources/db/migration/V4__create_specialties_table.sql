CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE specialties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO specialties (name) VALUES
('Corte Masculino'),
('Degradê'),
('Barba'),
('Pigmentação'),
('Sobrancelha'),
('Platinado'),
('Corte Infantil');