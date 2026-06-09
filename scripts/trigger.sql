-- atualizar a quilometragem após a manutencao

DELIMITER $$

CREATE TRIGGER trg_atualizar_quilometragem
AFTER INSERT ON tbl_manutencao
FOR EACH ROW
BEGIN

    UPDATE tbl_veiculo
    SET quilometragem = GREATEST(
        quilometragem,
        NEW.quilometragem
    )
    WHERE id = NEW.fk_id_veiculo;

END $$

DELIMITER ;

-- atualizar o score do veiculo de acordo com o tipo de manutencao
DELIMITER $$

CREATE TRIGGER trg_score_insert
AFTER INSERT ON tbl_manutencao
FOR EACH ROW
BEGIN

    DECLARE v_valor_score INT;

    SELECT valor_score
    INTO v_valor_score
    FROM tbl_tipo_manutencao
    WHERE id = NEW.fk_id_tipo_manutencao;

    UPDATE tbl_veiculo
    SET score = LEAST(
                    100,
                    GREATEST(
                        0,
                        score + v_valor_score
                    )
                )
    WHERE id = NEW.fk_id_veiculo;

END $$

DELIMITER ;

-- atualiza o score após remover a manutencao
DELIMITER $$

CREATE TRIGGER trg_score_delete
AFTER DELETE ON tbl_manutencao
FOR EACH ROW
BEGIN

    DECLARE v_valor_score INT;

    SELECT valor_score
    INTO v_valor_score
    FROM tbl_tipo_manutencao
    WHERE id = OLD.fk_id_tipo_manutencao;

    UPDATE tbl_veiculo
    SET score = GREATEST(
                    0,
                    score - v_valor_score
                )
    WHERE id = OLD.fk_id_veiculo;

END $$

DELIMITER ;

--  atualiza o score após o update de uma manutencao
DELIMITER $$

CREATE TRIGGER trg_score_update
AFTER UPDATE ON tbl_manutencao
FOR EACH ROW
BEGIN

    DECLARE v_score_antigo INT;
    DECLARE v_score_novo INT;

    SELECT valor_score
    INTO v_score_antigo
    FROM tbl_tipo_manutencao
    WHERE id = OLD.fk_id_tipo_manutencao;

    SELECT valor_score
    INTO v_score_novo
    FROM tbl_tipo_manutencao
    WHERE id = NEW.fk_id_tipo_manutencao;

    UPDATE tbl_veiculo
    SET score = LEAST(
                    100,
                    GREATEST(
                        0,
                        score - v_score_antigo + v_score_novo
                    )
                )
    WHERE id = NEW.fk_id_veiculo;

END $$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_manutencao_para_gasto
AFTER INSERT ON tbl_manutencao
FOR EACH ROW
BEGIN
    DECLARE v_categoria_manutencao INT;

    -- Busca o ID da categoria "Manutenção"
    SELECT id
    INTO v_categoria_manutencao
    FROM tbl_categoria_gasto
    WHERE nome_categoria = 'Manutenção'
    LIMIT 1;

    -- Insere automaticamente o gasto
    INSERT INTO tbl_gastos (
        data_gasto,
        valor,
        fk_id_veiculo,
        fk_id_categoria
    )
    VALUES (
        DATE(NEW.data_manutencao),
        NEW.custo,
        NEW.fk_id_veiculo,
        v_categoria_manutencao
    );

END$$

DELIMITER ;