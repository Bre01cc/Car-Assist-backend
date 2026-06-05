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
-- TIPOS DE MANUTENÇÃO
-- =========================================
INSERT INTO tbl_tipo_manutencao (
    nome,
    valor_score,
    descricao
) VALUES
(
    'Troca de óleo',
    -5,
    'Manutenção preventiva'
),
(
    'Revisão geral',
    -10,
    'Revisão completa'
),
(
    'Troca de pneus',
    -7,
    'Substituição dos pneus'
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

-- PENALIDADES
('Troca de Óleo Atrasada', -3, 'Troca de óleo realizada após o período recomendado'),
('Revisão Periódica Ignorada', -5, 'Revisão obrigatória não realizada'),
('Pneu Desgastado', -2, 'Pneus utilizados abaixo da condição ideal'),
('Alinhamento Atrasado', -2, 'Alinhamento não realizado dentro da periodicidade'),
('Balanceamento Atrasado', -2, 'Balanceamento não realizado dentro da periodicidade'),
('Bateria Sem Inspeção', -2, 'Bateria sem verificações preventivas'),
('Sistema de Freios Negligenciado', -6, 'Manutenção dos freios ignorada'),
('Falha Mecânica Recorrente', -4, 'Mesmo problema mecânico ocorreu diversas vezes'),
('Superaquecimento do Motor', -5, 'Veículo apresentou superaquecimento por falta de prevenção'),
('Pane Elétrica', -4, 'Falha elétrica causada por ausência de manutenção'),
('Vazamento Não Corrigido', -3, 'Vazamento identificado e não solucionado'),
('Peça Danificada por Negligência', -4, 'Componente sofreu danos por falta de manutenção'),
('Alto Custo Emergencial', -5, 'Gastos elevados decorrentes de manutenção emergencial'),
('Recall Ignorado', -6, 'Recall do fabricante não realizado'),
('Problema de Segurança Ignorado', -7, 'Falha que compromete a segurança do veículo'),
('Documentação de Manutenção Incompleta', -1, 'Histórico de manutenção incompleto'),
('Múltiplos Alertas Ignorados', -6, 'Diversos alertas preventivos não atendidos'),
('Uso Excessivo Sem Revisão', -4, 'Veículo utilizado intensamente sem revisão'),
('Inspeção Veicular Reprovada', -5, 'Veículo reprovado em inspeção técnica'),
('Manutenção Corretiva Frequente', -3, 'Alta incidência de manutenções corretivas'),

-- BONIFICAÇÕES
('Troca de Óleo no Prazo', 2, 'Troca de óleo realizada dentro da periodicidade'),
('Troca de Óleo Antecipada', 3, 'Troca de óleo realizada antes do vencimento'),
('Revisão Completa', 5, 'Revisão geral do veículo realizada com sucesso'),
('Check-up Preventivo', 3, 'Avaliação preventiva realizada'),
('Freios Revisados', 3, 'Sistema de freios revisado preventivamente'),
('Pneus Substituídos Preventivamente', 2, 'Troca preventiva dos pneus'),
('Alinhamento em Dia', 1, 'Alinhamento realizado no período correto'),
('Balanceamento em Dia', 1, 'Balanceamento realizado no período correto'),
('Bateria Inspecionada', 1, 'Bateria verificada preventivamente'),
('Sistema Elétrico Revisado', 2, 'Inspeção preventiva do sistema elétrico'),
('Sistema de Arrefecimento Revisado', 2, 'Prevenção de superaquecimento do motor'),
('Detecção de Vazamento', 2, 'Vazamento identificado antes de causar danos'),
('Correção Preventiva', 3, 'Problema corrigido antes de gerar falhas'),
('Histórico de Manutenção Completo', 2, 'Registro completo das manutenções'),
('Sequência de 3 Revisões em Dia', 4, 'Três revisões consecutivas realizadas no prazo'),
('Sequência de 5 Revisões em Dia', 6, 'Cinco revisões consecutivas realizadas no prazo'),
('Redução de Custos Corretivos', 2, 'Diminuição dos gastos corretivos ao longo do tempo'),
('Recall Realizado', 2, 'Recall atendido prontamente'),
('Inspeção Veicular Aprovada', 3, 'Veículo aprovado em inspeção técnica'),
('Veículo Sem Ocorrências Críticas', 2, 'Período prolongado sem falhas graves'),
('Manutenção Programada Cumprida', 3, 'Plano de manutenção seguido corretamente'),
('Diagnóstico Preventivo Realizado', 2, 'Análise preventiva executada'),
('Componente Crítico Substituído', 3, 'Substituição preventiva de peça importante'),
('Prevenção de Quebra', 4, 'Ação evitou falha mecânica significativa'),
('Cuidado Contínuo', 1, 'Manutenção constante do veículo'),
('Meta Mensal de Cuidados Cumprida', 2, 'Todas as atividades previstas para o mês realizadas');

