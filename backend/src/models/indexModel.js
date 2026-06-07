const conexao = require('../conexao/conexao');

function buscarPorEmail(email, callback) {
    const sql = 'SELECT * FROM usuario WHERE email = ?';

    conexao.query(
        sql,
        [email],
        (erro, resultado) => {
            if (erro) {
                return callback(erro, null);
            }

            callback(null, resultado)
        }
    );
}

function cadastrarUsuario(nome, email, senha, tipo, callback) {

    const sql = `
        INSERT INTO usuario (nome, email, senha, tipo, data_cadastro, status)
        VALUES (?, ?, ?, ?, NOW(), ?)
    `;

    const status = 'A';

    //console.log("EXECUTANDO INSERT:", { nome, email, senha, tipo });

    conexao.query(
        sql,
        [nome, email, senha, tipo, status],
        (erro, resultado) => {
            callback(erro, resultado);
        }
    );
    
}

function buscarPorId(id, callback) {
    const sql = `
        SELECT
            id_usuario,
            nome,
            email,
            tipo,
            data_cadastro,
            status
        FROM usuario
        WHERE id_usuario = ?
    `;

    conexao.query(sql, [id], (erro, resultado) => {
        callback(erro, resultado);
    });

}

function atualizarUsuario(idUsuario, nome, email, tipo, callback) {

    const sql = `
        UPDATE usuario
        SET nome = ?, email = ?, tipo = ?
        WHERE id_usuario = ?
    `;

    conexao.query(
        sql,
        [nome, email, tipo, idUsuario],
        callback
    );
}

function ativoInativo(codigo, ativo, callback) {
    console.log("Alterando campo status");

    var sql = "UPDATE usuario SET status = ? WHERE id_usuario = ?";

    console.log(sql);

    conexao.query(sql, [ativo, codigo], callback);

}

// Funções novas

function atualizarFormacao(
    id_usuario,
    curso,
    instituicao,
    semestre,
    data_inicio,
    data_termino,
    turno,
    callback
) {
    console.log("Update formação");

    const sql = `
        UPDATE formacao
        SET
            curso = ?,
            instituicao = ?,
            semestre = ?,
            data_inicio = ?,
            data_termino = ?,
            turno = ?
        WHERE fk_id_usuario = ?
    `;

    conexao.query(
        sql,
        [curso, instituicao, semestre, data_inicio, data_termino, turno, id_usuario],
        (err, result) => {

            if (err) {
                console.log("ERRO MYSQL UPDATE FORMACAO:");
                //console.log("sqlMessage:", err.sqlMessage);
                //console.log("sql:", err.sql);
                //console.log("erro completo:", err);
                console.log(err);
            }

            callback(err, result);
        }
    );
}

function criarFormacao(
    id_usuario,
    curso,
    instituicao,
    semestre,
    data_inicio,
    data_termino,
    turno,
    callback
) {
    console.log("MODEL INSERT CHAMADO");

    const sql = `
        INSERT INTO formacao
        (curso, instituicao, semestre, data_inicio, data_termino, turno, fk_id_usuario)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    conexao.query(
        sql,
        [curso, instituicao, semestre, data_inicio, data_termino, turno, id_usuario],
        (err, result) => {

            if (err) {
                console.log("ERRO MYSQL INSERT FORMACAO:");
                console.log("sqlMessage:", err.sqlMessage);
                console.log("sql:", err.sql);
                console.log("erro completo:", err);
            }

            console.log("RESULT INSERT:", result);

            callback(err, result);
        }
    );
}

function buscarFormacaoPorUsuario(id_usuario, callback) {
    const sql = `
        SELECT *
        FROM formacao
        WHERE fk_id_usuario = ?
    `;

    conexao.query(sql, [id_usuario], (err, result) => {

        if (err) {
            console.log("ERRO MYSQL SELECT FORMACAO:");
            console.log("sqlMessage:", err.sqlMessage);
            console.log("sql:", err.sql);
            console.log("erro completo:", err);
        }

        callback(err, result);
    });
}

// Endereço

function atualizarEndereco(idUsuario, cep, logradouro, complemento, numero, bairro, cidade, estado, callback) {
    const sql = `
        UPDATE endereco
        SET
            cep = ?,
            logradouro = ?,
            complemento = ?,
            numero = ?,
            bairro = ?,
            cidade = ?,
            estado = ?
        WHERE fk_id_usuario = ?
    `;

    conexao.query(sql,
        [cep, logradouro, complemento, numero, bairro, cidade, estado, idUsuario],
        (err, result) => {

            if (err) {
                console.log("ERRO MYSQL UPDATE ENDERECO:");
                console.log(err.sqlMessage);
                console.log(err.sql);
            }

            callback(err, result);
        }
    );
}

function criarEndereco(idUsuario, cep, logradouro, complemento, numero, bairro, cidade, estado, callback) {
    const sql = `
        INSERT INTO endereco
        (cep, logradouro, complemento, numero, bairro, cidade, estado, fk_id_usuario)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    conexao.query(
        sql,
        [cep, logradouro, complemento, numero, bairro, cidade, estado, idUsuario],
        (err, result) => {
            if (err) {
                console.log("ERRO INSERT ENDERECO:", err);
            }
            callback(err, result);
        }
    );
}

function buscarEnderecoPorUsuario(id_usuario, callback) {
    const sql = `
        SELECT *
        FROM endereco
        WHERE fk_id_usuario = ?
    `;

    conexao.query(sql, [id_usuario], (err, result) => {
        if (err) {
            console.log("ERRO SELECT ENDERECO:", err);
        }
        callback(err, result);
    });
}

module.exports = {
    buscarPorEmail,
    cadastrarUsuario,
    buscarPorId,
    atualizarUsuario,

    atualizarFormacao, // novo
    criarFormacao, // novo
    buscarFormacaoPorUsuario, // novo

    atualizarEndereco, // novo
    criarEndereco, // novo
    buscarEnderecoPorUsuario, // novo

    ativoInativo
};
