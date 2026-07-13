/*
 Nome do Script:  aula08_document.sql
 Objetivo:        Migração do SQLite para a base de dados MySQL, criação de tabelas e inserção de dados.
 Autor:           Humberto Henrique Castro Rocha
 RGA:             202512722003
 Data:            2025-07-13
*/

-- Criando a tabela correspondente à entidade User
CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade INT NOT NULL
);

-- Fazendo duas inserções na tabela User
INSERT INTO User (nome, idade) VALUES ('João Silva', 25);
INSERT INTO User (nome, idade) VALUES ('Maria Souza', 30);

-- Selecionando todas as entidades registradas
SELECT * FROM User;