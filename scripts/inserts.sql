USE car_assist_database;

-- =========================================
-- USUÁRIOS
-- =========================================
INSERT INTO tbl_usuario (
    nome,
    email,
    cpf,
    data_nascimento,
    senha,
    foto_usuario
) VALUES
(
    'João Silva',
    'joao@gmail.com',
    '12345678901',
    '1995-06-10',
    'hash123',
    'foto1.jpg'
),
(
    'Maria Souza',
    'maria@gmail.com',
    '98765432100',
    '1998-02-20',
    'hash456',
    'foto2.jpg'
),
(
    'Carlos Lima',
    'carlos@gmail.com',
    '45678912300',
    '1992-09-15',
    'hash789',
    'foto3.jpg'
);

-- =========================================
-- VEÍCULOS
-- =========================================
INSERT INTO tbl_veiculo (
    placa,
    modelo,
    marca,
    cor,
    ano,
    foto_veiculo
) VALUES
(
    'ABC1234',
    'Civic',
    'Honda',
    'PRETO',
    2020,
    'civic.jpg'
),
(
    'XYZ9876',
    'Gol',
    'Volkswagen',
    'BRANCO',
    2018,
    'gol.jpg'
),
(
    'BRA2E19',
    'Corolla',
    'Toyota',
    'PRATA',
    2022,
    'corolla.jpg'
);
-- =========================================
-- TIPOS DE SERVIÇO
-- =========================================
INSERT INTO tbl_tipo_servico (
    nome
) VALUES
('Oficina'),
('Posto de combustível'),
('Lava rápido'),
('Borracharia');

-- =========================================
-- CATEGORIAS DE GASTO
-- =========================================
INSERT INTO tbl_categoria_gasto (
    nome_categoria
) VALUES
('Combustível'),
('Manutenção'),
('Peças'),
('Lavagem');

-- =========================================
-- SERVIÇOS
-- =========================================
INSERT INTO tbl_servicos (
    nome_local,
    latitude,
    longitude,
    fk_id_tipo_servico
) VALUES
(
    'Oficina do Zé',
    -23.55052000,
    -46.63330800,
    1
),
(
    'Posto Shell Centro',
    -23.55100000,
    -46.63400000,
    2
),
(
    'Lava Rápido Flash',
    -23.54980000,
    -46.63200000,
    3
),
(
    'Borracharia Avenida',
    -23.54800000,
    -46.63150000,
    4
);

-- =========================================
-- ENDEREÇOS
-- =========================================
INSERT INTO tbl_enderecos (
    logradouro,
    cep,
    complemento,
    fk_id_servico
) VALUES
(
    'Rua A, 123',
    '06000000',
    'Próximo ao mercado',
    1
),
(
    'Av. Central, 456',
    '06001000',
    NULL,
    2
),
(
    'Rua das Flores, 89',
    '06002000',
    'Ao lado da farmácia',
    3
),
(
    'Av. Paulista, 1000',
    '06003000',
    'Esquina',
    4
);

-- =========================================
-- VÍNCULO USUÁRIO-VEÍCULO
-- =========================================
INSERT INTO tbl_usuario_veiculo (
    fk_id_usuario,
    fk_id_veiculo,
    papel_usuario,
    data_vinculo
) VALUES
(
    1,
    1,
    'Proprietário',
    '2024-01-01'
),
(
    2,
    1,
    'Editor',
    '2024-02-01'
),
(
    2,
    2,
    'Proprietário',
    '2024-03-01'
),
(
    3,
    3,
    'Proprietário',
    '2024-04-01'
);

-- =========================================
-- MANUTENÇÕES
-- =========================================
INSERT INTO tbl_manutencao (
    data_manutencao,
    data_criacao,
    custo,
    quilometragem,
    oficina,
    observacoes,
    fk_id_tipo_manutencao,
    fk_id_usuario,
    fk_id_veiculo
) VALUES
(
    '2025-01-20 10:00:00',
    NOW(),
    250.00,
    50000,
    'Oficina do Zé',
    'Tudo ok',
    1,
    1,
    1
),
(
    '2025-02-10 14:00:00',
    NOW(),
    600.00,
    70000,
    'Oficina do Zé',
    'Troca necessária',
    2,
    2,
    2
),
(
    '2025-03-05 09:30:00',
    NOW(),
    1200.00,
    30000,
    'Auto Center Prime',
    'Troca completa dos pneus',
    3,
    3,
    3
);

-- =========================================
-- GASTOS
-- =========================================
INSERT INTO tbl_gastos (
    data_gasto,
    valor,
    fk_id_veiculo,
    fk_id_categoria
) VALUES
(
    '2025-01-10',
    150.00,
    1,
    1
),
(
    '2025-01-15',
    300.00,
    1,
    2
),
(
    '2025-02-01',
    200.00,
    2,
    1
),
(
    '2025-03-01',
    1200.00,
    3,
    3
);

-- =========================================
-- EVIDÊNCIAS
-- =========================================
INSERT INTO tbl_evidencia (
    url,
    fk_id_manutencao
) VALUES
(
    'evidencia1.jpg',
    1
),
(
    'evidencia2.jpg',
    2
),
(
    'evidencia3.jpg',
    3
);

-- =========================================
-- LEMBRETES
-- =========================================
INSERT INTO tbl_lembretes (
    titulo,
    descricao,
    data_vencimento,
    status,
    fk_id_veiculo,
    fk_id_usuario
) VALUES
(
    'Trocar óleo',
    'Lembrete de troca de óleo',
    '2025-06-01 10:00:00',
    'pendente',
    1,
    1
),
(
    'Revisão anual',
    'Levar na oficina',
    '2025-07-01 10:00:00',
    'ativo',
    1,
    2
),
(
    'Calibrar pneus',
    'Verificar pressão',
    '2025-08-01 09:00:00',
    'ativo',
    1,
    3
);

-- =========================================
-- CHATBOT
-- =========================================
INSERT INTO tbl_chatbot (
    pergunta,
    resposta,
    fk_id_usuario
) VALUES
(
    'Quando trocar o óleo?',
    'A cada 10.000 km',
    1
),
(
    'Qual combustível usar?',
    'Gasolina comum',
    2
),
(
    'Quando trocar os pneus?',
    'Depende do desgaste e quilometragem',
    3
);

-- =========================================
-- USUÁRIO SERVIÇO
-- =========================================
INSERT INTO tbl_usuario_servico (
    fk_id_servicos,
    fk_id_usuario,
    data_vinculo
) VALUES
(
    1,
    2,
    CURDATE()
),
(
    2,
    2,
    CURDATE()
),
(
    3,
    3,
    CURDATE()
),
(
    4,
    1,
    CURDATE()
);


INSERT INTO tbl_tipo_manutencao (nome, valor_score, descricao) VALUES

('Troca de Óleo', 2, 'Substituição do óleo lubrificante do motor'),
('Troca de Filtros', 1, 'Substituição dos filtros do veículo'),
('Revisão Completa', 5, 'Revisão geral preventiva do veículo'),
('Check-up Preventivo', 3, 'Inspeção preventiva dos sistemas do veículo'),
('Revisão dos Freios', 3, 'Manutenção preventiva do sistema de freios'),
('Troca de Pneus', 2, 'Substituição dos pneus desgastados'),
('Alinhamento', 1, 'Correção do alinhamento das rodas'),
('Balanceamento', 1, 'Balanceamento das rodas do veículo'),
('Troca de Bateria', 2, 'Substituição da bateria automotiva'),
('Revisão Elétrica', 2, 'Inspeção e manutenção do sistema elétrico'),
('Sistema de Arrefecimento', 2, 'Manutenção do sistema de arrefecimento do motor'),
('Troca de Correia', 3, 'Substituição preventiva da correia do motor'),
('Troca de Velas', 2, 'Substituição das velas de ignição'),
('Funilaria e Pintura', 1, 'Reparo estético da carroceria'),
('Recall Realizado', 2, 'Atendimento a recall do fabricante'),
('Inspeção Veicular', 2, 'Inspeção técnica do veículo'),
('Manutenção Corretiva', 1, 'Correção de falhas identificadas'),
('Troca de Peças', 2, 'Substituição de componentes defeituosos');

