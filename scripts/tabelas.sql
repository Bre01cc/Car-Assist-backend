CREATE DATABASE car_assist_database;

USE car_assist_database;

-- =====================================================
-- TABELA: USUÁRIO
-- =====================================================
CREATE TABLE tbl_usuario (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    data_nascimento DATE NULL,
    senha VARCHAR(255) NOT NULL,
    foto_usuario VARCHAR(255) NULL,
    is_ativo BOOLEAN DEFAULT TRUE
);

-- =====================================================
-- TABELA: VEÍCULO
-- =====================================================
CREATE TABLE tbl_veiculo (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(10) NOT NULL UNIQUE,
    modelo VARCHAR(50) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    cor ENUM(
        'AMARELO',
        'AZUL',
        'BRANCO',
        'CINZA',
        'DOURADO',
        'LARANJA',
        'MARROM',
        'PRATA',
        'PRETO',
        'ROSA',
        'ROXO',
        'VERDE',
        'VERMELHO',
        'FANTASIA'
    ) NOT NULL,
    score DECIMAL(5,2) DEFAULT 100.00,
    ano INT NOT NULL,
    foto_veiculo VARCHAR(255),
    is_ativo BOOLEAN DEFAULT TRUE
);

-- =====================================================
-- TABELA: TIPO MANUTENÇÃO
-- =====================================================
CREATE TABLE tbl_tipo_manutencao (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    valor_score INT NOT NULL,
    descricao VARCHAR(255) NULL
);

-- =====================================================
-- TABELA: TIPO SERVIÇO
-- =====================================================
CREATE TABLE tbl_tipo_servico (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

-- =====================================================
-- TABELA: CATEGORIA GASTO
-- =====================================================
CREATE TABLE tbl_categoria_gasto (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome_categoria VARCHAR(50) NOT NULL
);

-- =====================================================
-- TABELA: SERVIÇOS
-- =====================================================
CREATE TABLE tbl_servicos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome_local VARCHAR(100) NOT NULL,
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    fk_id_tipo_servico INT NOT NULL,

    CONSTRAINT FK_serv_tipo
        FOREIGN KEY (fk_id_tipo_servico)
        REFERENCES tbl_tipo_servico (id)
);

-- =====================================================
-- TABELA: ENDEREÇOS
-- =====================================================
CREATE TABLE tbl_enderecos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    logradouro VARCHAR(100) NOT NULL,
    cep VARCHAR(12) NOT NULL,
    complemento VARCHAR(150) NULL,
    fk_id_servico INT NOT NULL,

    CONSTRAINT FK_end_serv
        FOREIGN KEY (fk_id_servico)
        REFERENCES tbl_servicos (id)
        ON DELETE CASCADE
);

-- =====================================================
-- TABELA: LEMBRETES
-- =====================================================
CREATE TABLE tbl_lembretes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_vencimento DATETIME NOT NULL,
    status ENUM(
        'ativo',
        'inativo',
        'pendente'
    ) NOT NULL,
    fk_id_veiculo INT NOT NULL,

    CONSTRAINT FK_lembr_vei
        FOREIGN KEY (fk_id_veiculo)
        REFERENCES tbl_veiculo (id)
        ON DELETE CASCADE
);

-- =====================================================
-- TABELA: GASTOS
-- =====================================================
CREATE TABLE tbl_gastos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    data_gasto DATE NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    fk_id_veiculo INT NOT NULL,
    fk_id_categoria INT NOT NULL,
    is_ativo BOOLEAN DEFAULT TRUE,

    CONSTRAINT FK_gas_vei
        FOREIGN KEY (fk_id_veiculo)
        REFERENCES tbl_veiculo (id)
        ON DELETE CASCADE,

    CONSTRAINT FK_gas_cat
        FOREIGN KEY (fk_id_categoria)
        REFERENCES tbl_categoria_gasto (id)
);

-- =====================================================
-- TABELA: MANUTENÇÃO
-- =====================================================
CREATE TABLE tbl_manutencao (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    data_manutencao DATETIME NOT NULL,
    custo DECIMAL(10,2) NOT NULL,
    quilometragem INT NOT NULL,
    oficina VARCHAR(100) NULL,
    observacoes TEXT NULL,
    is_ativo BOOLEAN DEFAULT TRUE,
    fk_id_tipo_manutencao INT NOT NULL,
    fk_id_usuario INT NOT NULL,
    fk_id_veiculo INT NOT NULL,

    CONSTRAINT FK_manut_tipo
        FOREIGN KEY (fk_id_tipo_manutencao)
        REFERENCES tbl_tipo_manutencao (id),

    CONSTRAINT FK_manut_usu
        FOREIGN KEY (fk_id_usuario)
        REFERENCES tbl_usuario (id),

    CONSTRAINT FK_manut_vei
        FOREIGN KEY (fk_id_veiculo)
        REFERENCES tbl_veiculo (id)
        ON DELETE CASCADE
);

-- =====================================================
-- TABELA: PEÇAS
-- =====================================================
CREATE TABLE tbl_pecas (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    fk_id_manutencao INT NOT NULL,

    CONSTRAINT FK_manu_pecas_manu
        FOREIGN KEY (fk_id_manutencao)
        REFERENCES tbl_manutencao (id)
        ON DELETE CASCADE
);

-- =====================================================
-- TABELA: EVIDÊNCIA
-- =====================================================
CREATE TABLE tbl_evidencia (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    fk_id_manutencao INT NOT NULL,

    CONSTRAINT FK_evid_manuten
        FOREIGN KEY (fk_id_manutencao)
        REFERENCES tbl_manutencao (id)
        ON DELETE CASCADE
);

-- =====================================================
-- TABELA: CHATBOT
-- =====================================================
CREATE TABLE tbl_chatbot (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pergunta TEXT NOT NULL,
    resposta TEXT NOT NULL,
    data_interacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_id_usuario INT NOT NULL,

    CONSTRAINT FK_chat_usu
        FOREIGN KEY (fk_id_usuario)
        REFERENCES tbl_usuario (id)
        ON DELETE CASCADE
);

-- =====================================================
-- TABELA: USUÁRIO SERVIÇO
-- =====================================================
CREATE TABLE tbl_usuario_servico (
    id INT NOT NULL AUTO_INCREMENT,

    fk_id_servicos INT NOT NULL,
    fk_id_usuario INT NOT NULL,

    PRIMARY KEY (id),

    UNIQUE KEY UK_usuario_servico (
        fk_id_servicos,
        fk_id_usuario
    ),

    CONSTRAINT FK_usu_serv_s
        FOREIGN KEY (fk_id_servicos)
        REFERENCES tbl_servicos (id)
        ON DELETE CASCADE,

    CONSTRAINT FK_usu_serv_u
        FOREIGN KEY (fk_id_usuario)
        REFERENCES tbl_usuario (id)
        ON DELETE CASCADE
);
-- =====================================================
-- TABELA: USUÁRIO VEÍCULO
-- =====================================================
CREATE TABLE tbl_usuario_veiculo (
    fk_id_usuario INT NOT NULL,
    fk_id_veiculo INT NOT NULL,

    papel_usuario ENUM(
        'Proprietário',
        'Editor',
        'Visualizador'
    ) DEFAULT 'Proprietário',

    data_vinculo DATE NOT NULL,
    data_desvinculo DATE NULL,
    is_ativo BOOLEAN DEFAULT TRUE,

    PRIMARY KEY (fk_id_usuario, fk_id_veiculo),

    CONSTRAINT FK_usu_vei_u
        FOREIGN KEY (fk_id_usuario)
        REFERENCES tbl_usuario (id)
        ON DELETE CASCADE,

    CONSTRAINT FK_usu_vei_v
        FOREIGN KEY (fk_id_veiculo)
        REFERENCES tbl_veiculo (id)
        ON DELETE CASCADE
);