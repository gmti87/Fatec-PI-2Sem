const indexModel = require("../models/indexModel");

module.exports = {
    login,
    verificaLogin,
    logout,
    cadastrarUsuario,
    perfil,
    atualizarUsuario,
    ativoInativo
}

const bcrypt = require("bcryptjs");

function login(req, res) {
    const { email, senha } = req.body;

    //console.log("Email recebido:", email);
    //console.log("Senha recebida:", senha);

    indexModel.buscarPorEmail(email, (erro, usuario) => {

        if (erro) {
            console.log("Erro banco:", erro);
            return res.status(500).json({ mensagem: "Erro no banco" });
        }

        //console.log("Resultado banco:", usuario);

        if (usuario.length === 0) {
            return res.status(401).json({ mensagem: "Usuário não encontrado" });
        }

        //console.log("Hash do banco:", usuario[0].senha);

        bcrypt.compare(senha, usuario[0].senha, (err, senhaValida) => {

            console.log("Erro bcrypt:", err);
            console.log("Senha válida:", senhaValida);

            if (!senhaValida) {
                return res.status(401).json({ mensagem: "Senha incorreta" });
            }

            req.session.usuario = {
                id: usuario[0].id_usuario,
                nome: usuario[0].nome,
                email: usuario[0].email,
                tipo: usuario[0].tipo
            };

            req.session.save(() => {
                return res.status(200).json({
                    mensagem: "Login realizado",
                    nome: usuario[0].nome,
                    tipo: usuario[0].tipo
                });
            });
        });
    });
}


function verificaLogin(req, res) {
    if (req.session.usuario) {
        return res.status(200).json(req.session.usuario);
    }

    return res.status(401).json({
        mensagem: "Não autenticado"
    });
}

function logout(req, res) {
    req.session.destroy((erro) => {

        if (erro) {
            return res.status(500).json({
                mensagem: "Erro ao sair"
            });
        }
        
        res.clearCookie("connect.sid");

        return res.status(200).json({
            mensagem: "Logout realizado com sucesso"
        });

    });
}

function cadastrarUsuario(req, res) {
    console.log("Entrou na rota /login/cadastro");
    const { nome, email, senha, tipo } = req.body;

    // Criptografa a senha antes de salvar
    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ mensagem: "Erro ao criptografar senha" });
        }

        indexModel.cadastrarUsuario(nome, email, hash, tipo, (erro, resultado) => {
            if (erro) {
                console.log("Erro no INSERT:", erro.sqlMessage);
                return res.status(500).json({ mensagem: "Erro ao cadastrar", erro: erro.sqlMessage });
            }

            console.log("Usuário inserido, ID:", resultado.insertId);
            return res.status(200).json({ mensagem: "Usuário cadastrado com sucesso" });
        });

    });
}


function perfil(req, res) {
    if (!req.session.usuario) {
        return res.status(401).json({
            mensagem: "Usuário não autenticado"
        });
    }

    const idUsuario = req.session.usuario.id;

    indexModel.buscarPorId(idUsuario, (erro, resultado) => {

        if (erro) {
            return res.status(500).json({
                mensagem: "Erro ao buscar usuário"
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }

        return res.status(200).json(resultado[0]);
    });

}

function atualizarUsuario(req, res) {
    if (!req.session.usuario) {
        return res.status(401).json({
            mensagem: "Usuário não autenticado"
        });
    }

    const idUsuario = req.session.usuario.id;

    const { nome, email, tipo } = req.body;

    indexModel.atualizarUsuario(
        idUsuario,
        nome,
        email,
        tipo,
        (erro, resultado) => {

            if (erro) {
                console.log(erro);

                return res.status(500).json({
                    mensagem: "Erro ao atualizar usuário"
                });
            }

            // Atualiza os dados da sessão também
            req.session.usuario.nome = nome;
            req.session.usuario.email = email;

            return res.status(200).json({
                mensagem: "Usuário atualizado com sucesso"
            });
        }
    );
}

function ativoInativo(req, res) {
    console.log("Sessão:", req.session);
    console.log("Usuário:", req.session.usuario);

    if (!req.session.usuario) {
        return res.status(401).json({
            mensagem: "Usuário não autenticado"
        });
    }

    const idUsuario = req.session.usuario.id;

    indexModel.buscarPorId(idUsuario, (erro, resultado) => {

        if (erro) {
            return res.status(500).json({
                mensagem: "Erro ao buscar usuário"
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }

        let status = resultado[0].status;

        status = status === "A" ? "I" : "A";

        indexModel.ativoInativo(
            idUsuario,
            status,
            (erro) => {

                if (erro) {
                    return res.status(500).json({
                        mensagem: "Erro ao atualizar status"
                    });
                }

                return res.status(200).json({
                    mensagem: "Status atualizado",
                    novo_status: status
                });
            }
        );
    });
}