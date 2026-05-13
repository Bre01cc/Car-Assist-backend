-- USUÁRIOS
INSERT INTO tbl_usuario (nome, email, cpf, data_nascimento, senha, foto_usuario)
VALUES 
('João Silva', 'joao@gmail.com', '12345678901', '1995-06-10', 'hash123', 'foto1.jpg'),
('Maria Souza', 'maria@gmail.com', '98765432100', '1998-02-20', 'hash456', 'foto2.jpg');

-- VEÍCULOS
INSERT INTO tbl_veiculo (placa, modelo, marca, cor, ano)
VALUES 
('ABC1234', 'Civic', 'Honda', 'PRETO', 2020),
('XYZ9876', 'Gol', 'Volkswagen', 'BRANCO', 2018);

-- VÍNCULO USUÁRIO-VEÍCULO
INSERT INTO tbl_usuario_veiculo (fk_id_usuario, fk_id_veiculo, papel_usuario, data_vinculo)
VALUES 
(1, 1, 'Proprietário', '2024-01-01'),
(2, 1, 'Editor', '2024-02-01'),
(2, 2, 'Proprietário', '2024-03-01');

-- TIPOS DE MANUTENÇÃO (ANTES da manutenção)
INSERT INTO tbl_tipo_manutencao (nome, valor_score, descricao)
VALUES 
('Troca de óleo', -5, 'Manutenção preventiva'),
('Revisão geral', -10, 'Revisão completa');

-- MANUTENÇÃO (SEM pecas)
INSERT INTO tbl_manutencao (
    data_manutencao, custo, quilometragem, oficina, observacoes,
    fk_id_tipo_manutencao, fk_id_usuario, fk_id_veiculo
)
VALUES 
('2025-01-20 10:00:00', 250.00, 50000, 'Oficina do Zé', 'Tudo ok', 1, 1, 1),
('2025-02-10 14:00:00', 600.00, 70000, 'Oficina do Zé', 'Troca necessária', 2, 2, 2);

-- PEÇAS
INSERT INTO tbl_pecas (
    nome,
    fk_id_manutencao
) VALUES
(
    'Filtro de óleo',
    1
),
(
    'Freios',
    1
);

-- TIPO DE SERVIÇO
INSERT INTO tbl_tipo_servico (nome)
VALUES 
('Oficina'),
('Posto de combustível');

-- CATEGORIA DE GASTO
INSERT INTO tbl_categoria_gasto (nome_categoria)
VALUES 
('Combustível'),
('Manutenção');

-- SERVIÇOS
INSERT INTO tbl_servicos (nome_local, latitude, longitude, fk_id_tipo_servico)
VALUES 
('Oficina do Zé', -23.550520, -46.633308, 1),
('Posto Shell Centro', -23.551000, -46.634000, 2);

-- ENDEREÇOS
INSERT INTO tbl_enderecos (logradouro, cep, complemento, fk_id_servico)
VALUES 
('Rua A, 123', '06000000', 'Próximo ao mercado', 1),
('Av. Central, 456', '06001000', NULL, 2);

-- GASTOS
INSERT INTO tbl_gastos (data_gasto, valor, fk_id_veiculo, fk_id_categoria)
VALUES 
('2025-01-10', 150.00, 1, 1),
('2025-01-15', 300.00, 1, 2),
('2025-02-01', 200.00, 2, 1);

-- EVIDÊNCIAS
INSERT INTO tbl_evidencia (url, fk_id_manutencao)
VALUES 
('evidencia1.jpg', 1),
('evidencia2.jpg', 2);

-- LEMBRETES
INSERT INTO tbl_lembretes (titulo, descricao, data_vencimento, status, fk_id_veiculo)
VALUES 
('Trocar óleo', 'Lembrete de troca de óleo', '2025-06-01 10:00:00', 'pendente', 1),
('Revisão anual', 'Levar na oficina', '2025-07-01 10:00:00', 'ativo', 2);

-- CHATBOT
INSERT INTO tbl_chatbot (pergunta, resposta, fk_id_usuario)
VALUES 
('Quando trocar o óleo?', 'A cada 10.000 km', 1),
('Qual combustível usar?', 'Gasolina comum', 2);

-- USUÁRIO SERVIÇO
INSERT INTO tbl_usuario_servico (fk_id_servicos, fk_id_usuario)
VALUES 
(1, 1),
(2, 2);