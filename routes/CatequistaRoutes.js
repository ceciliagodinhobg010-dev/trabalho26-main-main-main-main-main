import express from "express";
import multer from "multer";

import CatequistaController from "../controllers/CatequistaController.js";

const router = express.Router();

const controle = new CatequistaController();

router.get("/login", (req, res) => {

    controle.login(req, res);

});


router.post("/entrar", (req, res) => {

    controle.entrar(req, res);

});

router.get("/criarConta", (req, res) => {

    controle.criarConta(req, res);

});


router.post("/criarConta", (req, res) => {

    controle.criar(req, res);

});

router.post("/UsuarioESenha", (req, res) => {

    controle.UsuarioESenha(req, res);

});

router.get("/perfil", (req, res) => {

    controle.perfil(req, res);

});

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, "public/uploads/perfil");

    },

    filename: function (req, file, cb) {

        const nome = Date.now() + "-" + file.originalname;

        cb(null, nome);

    }

});


const upload = multer({

    storage: storage

});

router.get("/perfil/edt", (req, res) => {

    controle.edt(req, res);

});


router.post("/perfil/edt", upload.single("foto"), (req, res) => {

    controle.salvarEdicao(req, res);

});

router.get("/perfil/del", (req, res) => {

    controle.del(req, res);

});


router.post("/perfil/del", (req, res) => {

    controle.excluir(req, res);

});

router.get("/catequistaInicial", (req, res) => {

    controle.inicio(req, res);

});

router.get("/saibaMais", (req, res) => {

    res.render('catequista/saibaMais');

});

export default router;