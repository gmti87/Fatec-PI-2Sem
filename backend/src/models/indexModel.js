const conexao = require('../conexao/conexao.js');

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

    console.log("EXECUTANDO INSERT:", { nome, email, senha, tipo, status });

    conexao.query(sql, [nome, email, senha, tipo, status], (erro, resultado) => {
        if (erro) {
            console.log("ERRO NO INSERT:", erro.sqlMessage);
        } else {
            console.log("RESULTADO DO INSERT:", resultado);
        }
        callback(erro, resultado);
    });
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

module.exports = {
    buscarPorEmail,
    cadastrarUsuario,
    buscarPorId,
    atualizarUsuario,
    ativoInativo
};