const indexModel = require("../models/indexModel");
const bcrypt = require('bcryptjs');

module.exports = {
    login,
    verificaLogin,
    logout,
    cadastrarUsuario,
    perfil,
    atualizarUsuario,
    ativoInativo,
    formacao, // novo
    endereco // novo
}

function login(req, res) {

    console.log("BODY RECEBIDO:", req.body);

    const { email, senha } = req.body;

    indexModel.buscarPorEmail(
        email,
        (erro, usuario) => {

            console.log("USUARIO ENCONTRADO", usuario);

            if (erro) {
                return res.status(500).json({
                    mensagem: "Erro no banco"
                });
            }

            if (usuario.length === 0) {
                return res.status(401).json({
                    mensagem: "Usuário não encontrado"
                });
            }

            bcrypt.compare(
                senha,
                usuario[0].senha,
                (err, senhaValida) => {

                    if (err) {
                        return res.status(500).json({
                            mensagem: "Erro ao validar senha"
                        });
                    }

                    if (!senhaValida) {
                        return res.status(401).json({
                            mensagem: "Senha incorreta"
                        });
                    }

                    req.session.usuario = {
                        id: usuario[0].id_usuario,
                        nome: usuario[0].nome,
                        email: usuario[0].email
                    };

                    req.session.save(() => {

                        return res.status(200).json({
                            mensagem: "Login realizado",
                            nome: usuario[0].nome
                        });

                    });
                }
            );
        }
    );
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
    //console.log("chamou");

    const { nome, email, senha, tipo } = req.body;

    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                mensagem: "Erro ao criptografar senha!"
            });
        }

        indexModel.cadastrarUsuario(
            nome,
            email,
            hash,
            tipo,
            (erro, resultado) => {
                if (erro) {
                    return res.status(500).json({
                        mensagem: "Erro ao cadastrar usuário"
                    });
                }

                return res.status(200).json({
                    mensagem: "Usuário cadastrado com sucesso",
                    id_usuario: resultado.insertId
                });
            }
        );
    });
}

function perfil(req, res) {

    if (!req.session.usuario) {
        return res.status(401).json({
            mensagem: "Usuário não autenticado"
        });
    }

    const idUsuario = req.session.usuario.id;

    indexModel.buscarPorId(idUsuario, (erro, usuario) => {

        if (erro) {
            return res.status(500).json({
                mensagem: "Erro ao buscar usuário"
            });
        }

        if (usuario.length === 0) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }

        indexModel.buscarFormacaoPorUsuario(
            idUsuario,
            (erro, formacao) => {

                if (erro) {
                    return res.status(500).json({
                        mensagem: "Erro ao buscar formação"
                    });
                }

                indexModel.buscarEnderecoPorUsuario(
                    idUsuario,
                    (erro, endereco) => {

                        if (erro) {
                            return res.status(500).json({
                                mensagem: "Erro ao buscar endereço"
                            });
                        }

                        return res.status(200).json({
                            ...usuario[0],

                            formacao:
                                formacao.length > 0
                                    ? formacao[0]
                                    : null,

                            endereco:
                                endereco.length > 0
                                    ? endereco[0]
                                    : null
                        });
                    }
                );
            }
        );
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

function formacao(req, res) {

    console.log("Chegou");

    console.log("BODY FORMACAO:", req.body);
    console.log("ID USUARIO:", req.body.id_usuario);

    const id_usuario = req.body.id_usuario;

    console.log("ID RECEBIDO:", id_usuario);
    console.log("BODY:", req.body);

    if (!id_usuario) {
        return res.status(400).json({
            mensagem: "id_usuario não enviado"
        });
    }

    const {
        curso,
        instituicao,
        semestre,
        data_inicio,
        data_termino,
        turno
    } = req.body;

    indexModel.buscarFormacaoPorUsuario(id_usuario, (erro, resultado) => {

        if (erro) {
            return res.status(500).json({ mensagem: "Erro ao buscar formação" });
        }

        if (!resultado || resultado.length === 0) {
            return indexModel.criarFormacao(
                id_usuario,
                curso,
                instituicao,
                semestre,
                data_inicio,
                data_termino,
                turno,
                (erro) => {
                    if (erro) {
                        console.log(erro);
                        return res.status(500).json({ mensagem: "Erro ao criar formação" });
                    }

                    return res.status(201).json({ mensagem: "Formação criada" });
                }
            );
        }

        return indexModel.atualizarFormacao(
            id_usuario,
            curso,
            instituicao,
            semestre,
            data_inicio,
            data_termino,
            turno,
            (erro) => {
                if (erro) {
                    console.log(erro);
                    return res.status(500).json({ mensagem: "Erro ao atualizar formação" });
                }

                return res.status(200).json({ mensagem: "Formação atualizada" });
            }
        );
    });
}

function endereco(req, res) {

    const idUsuario = req.body.id_usuario;

    console.log("ID ENDEREÇO:", idUsuario);
    console.log("BODY:", req.body);

    if (!idUsuario) {
        return res.status(400).json({
            mensagem: "id_usuario não enviado"
        });
    }

    const {
        cep,
        logradouro,
        complemento,
        numero,
        bairro,
        cidade,
        estado
    } = req.body;

    indexModel.buscarEnderecoPorUsuario(idUsuario, (erro, resultado) => {

        if (erro) {
            return res.status(500).json({ mensagem: "Erro ao buscar endereço" });
        }

        if (resultado.length === 0) {
            return indexModel.criarEndereco(
                idUsuario,
                cep,
                logradouro,
                complemento,
                numero,
                bairro,
                cidade,
                estado,
                (erro) => {
                    if (erro) {
                        console.log(erro);
                        return res.status(500).json({ mensagem: "Erro ao criar endereço" });
                    }

                    return res.status(201).json({ mensagem: "Endereço criado" });
                }
            );
        }

        return indexModel.atualizarEndereco(
            idUsuario,
            cep,
            logradouro,
            complemento,
            numero,
            bairro,
            cidade,
            estado,
            (erro) => {
                if (erro) {
                    console.log(erro);
                    return res.status(500).json({ mensagem: "Erro ao atualizar endereço" });
                }

                return res.status(200).json({ mensagem: "Endereço atualizado" });
            }
        );
    });
}