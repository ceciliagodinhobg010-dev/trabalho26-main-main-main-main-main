
import express from 'express';

import GrupoController from '../controllers/GrupoController.js';

const router = express.Router();

const controle = new GrupoController();

router.get("/grupos", (req, res) => {

    controle.listar(req, res);

});

router.get("/grupos/lst", (req, res) => {

    controle.listar(req, res);

});

router.get("/grupos/add", (req, res) => {

    res.render("grupos/add");

});

router.post("/grupos/add", (req, res) => {

    controle.criar(req, res);

});

router.get("/grupos/cadastroCatequizandos/:id", (req, res) => {

    controle.cadastroCatequizandos(req, res);

});

router.post("/grupos/cadastroCatequizandos/:id", (req, res) => {

    controle.cadastrarCatequizando(req, res);

});

router.get("/grupos/edt/:id", (req, res) => {

    controle.editar(req, res);

});

router.post("/grupos/edt/:id", (req, res) => {

    controle.atualizar(req, res);

});

router.get("/grupos/del/:id", (req, res) => {

    controle.excluirForm(req, res);

});

router.post("/grupos/del/:id", (req, res) => {

    controle.excluir(req, res);

});


export default router;
