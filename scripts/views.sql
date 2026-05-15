

create view vw_servicos as select 
servico.id,
servico.nome_local,
servico.latitude,
servico.longitude,
tipo_servico.id id_tipo_servico,
tipo_servico.nome
from tbl_servicos servico join tbl_tipo_servico tipo_servico on 
tipo_servico.id = servico.fk_id_tipo_servico;
 
create view vw_endereco as select 
endereco.id,
endereco.logradouro,
endereco.cep,
endereco.complemento,
servico.id id_servico,
servico.nome_local
from tbl_enderecos endereco join tbl_servicos servico on
servico.id = endereco.fk_id_servico;

create view vw_lembretes as select
lembrete.id,
lembrete.titulo,
lembrete.descricao,
lembrete.data_criacao,
lembrete.data_vencimento,
lembrete.status,
veiculo.id id_veiculo,
veiculo.modelo
from tbl_lembretes lembrete join tbl_veiculo veiculo on
lembrete.fk_id_veiculo = veiculo.id;


create view vw_gastos as select 
gasto.id,
gasto.data_gasto,
gasto.valor,
veiculo.id id_veiculo,
veiculo.modelo,
categoria_gasto.id id_categoria_gasto,
categoria_gasto.nome_categoria
from tbl_gastos gasto join tbl_veiculo veiculo on
gasto.fk_id_veiculo = veiculo.id join tbl_categoria_gasto categoria_gasto on
gasto.fk_id_categoria = categoria_gasto.id;

CREATE VIEW vw_manutencao AS 
SELECT 
    manutencao.id,
    manutencao.data_manutencao,
    manutencao.custo,
    manutencao.quilometragem,
    manutencao.oficina,
    manutencao.observacoes,
    manutencao.is_ativo,
    
    tipo_manutencao.id AS id_tipo_manutencao,
    tipo_manutencao.nome AS nome_tipo_manutencao,
    
    usuario.id AS id_usuario,
    usuario.nome AS nome_usuario,
    
    veiculo.id AS id_veiculo,
    veiculo.modelo,
    
    evidencia.id AS id_evidencia,
    evidencia.url,

    peca.id AS id_peca,
    peca.nome AS nome_peca

FROM tbl_manutencao manutencao

JOIN tbl_tipo_manutencao tipo_manutencao 
    ON manutencao.fk_id_tipo_manutencao = tipo_manutencao.id

JOIN tbl_usuario usuario 
    ON manutencao.fk_id_usuario = usuario.id

JOIN tbl_veiculo veiculo 
    ON manutencao.fk_id_veiculo = veiculo.id

LEFT JOIN tbl_evidencia evidencia 
    ON evidencia.fk_id_manutencao = manutencao.id

LEFT JOIN tbl_pecas peca
    ON peca.fk_id_manutencao = manutencao.id;


create view vw_usuario as select 
usuario.id,
usuario.nome,
usuario.cpf,
usuario.data_nascimento,
usuario.foto_usuario,
usuario.is_ativo from tbl_usuario usuario;

create view vw_evidencia_data as select
evidencia.id,
evidencia.url from tbl_evidencia evidencia;

select * from vw_gastos;
select * from vw_servicos;


create view vw_evidencia as select 
evidencia.id,
evidencia.url,
manutencao.id id_manutencao,
manutencao.oficina,
manutencao.data_manutencao data
from tbl_evidencia evidencia join tbl_manutencao manutencao on
evidencia.fk_id_manutencao = manutencao.id;

create view vw_pecas as select 
peca.id,
peca.nome,
manutencao.id id_manutencao,
manutencao.data_manutencao data,
manutencao.oficina
from tbl_pecas peca join tbl_manutencao manutencao
on peca.fk_id_manutencao = manutencao.id;

create view vw_gasto as select 
gasto.id,
gasto.data_gasto,
gasto.valor,
gasto.is_ativo,
veiculo.id id_veiculo,
veiculo.modelo,
tipo_gasto.id id_tipo_gasto,
tipo_gasto.nome_categoria
from tbl_gastos gasto join tbl_veiculo veiculo 
on gasto.fk_id_veiculo = veiculo.id left join tbl_categoria_gasto tipo_gasto
on gasto.fk_id_categoria = tipo_gasto.id;

CREATE VIEW vw_usuario_servico AS
SELECT
    usuario_servico.fk_id_usuario id_usuario,
    usuario_servico.id,
    usuario_servico.data_vinculo,
    usuario_servico.data_desvinculo,

    servico.id AS id_servico,
    servico.nome_local,
    servico.latitude,
    servico.longitude,

    tipo_servico.id AS id_tipo_servico,
    tipo_servico.nome,

    endereco.id AS id_endereco,
    endereco.logradouro,
    endereco.cep,
    endereco.complemento

FROM tbl_usuario_servico usuario_servico

JOIN tbl_servicos servico
    ON usuario_servico.fk_id_servicos = servico.id

JOIN tbl_tipo_servico tipo_servico
    ON tipo_servico.id = servico.fk_id_tipo_servico

JOIN tbl_enderecos endereco
    ON endereco.fk_id_servico = servico.id;