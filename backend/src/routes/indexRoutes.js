const express = require('express');

const router = express.Router();

const indexController = require("../controllers/indexControllers.js");

//console.log(indexController);

// antigo
router.put('/status', indexController.ativoInativo);

// novos
router.put('/formacao', indexController.formacao);

// router.put('/formacao', (req, res) => {

//     console.log("🔥 ROTA FORMACAO CHAMADA");

//     console.log(req.body);

//     return res.json({
//         mensagem: "rota funcionando"
//     });

// });

router.put('/endereco', indexController.endereco);

// antigo
router.post('/', indexController.login);

router.post("/cadastro", indexController.cadastrarUsuario);

router.get('/verificar', indexController.verificaLogin);

router.get('/perfil', indexController.perfil);

router.put('/usuario', indexController.atualizarUsuario);

router.post('/logout', indexController.logout);

module.exports = router;