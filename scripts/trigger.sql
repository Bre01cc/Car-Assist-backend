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