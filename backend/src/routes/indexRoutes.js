const express = require('express');

const router = express.Router();

const indexController = require("../controllers/indexControllers.js");

router.put('/status', indexController.ativoInativo);

router.post('/', indexController.login);

router.post("/cadastro", indexController.cadastrarUsuario);

router.get('/verificar', indexController.verificaLogin);

router.get('/perfil', indexController.perfil);

router.put('/usuario', indexController.atualizarUsuario);

router.post('/logout', indexController.logout);

module.exports = router;