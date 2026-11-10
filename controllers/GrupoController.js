
import Grupo from '../models/Grupo.js';
import Catequizando from '../models/Catequizando.js';

export default class GrupoController {

    // Listar grupos
    async listar(req, res) {

        const grupos = await Grupo.find();

        res.render("grupos/lst", {
            grupos: grupos
        });

    }


    // Criar grupo
    async criar(req, res) {

        const grupo = new Grupo({
            nome: req.body.nome,
            ano: req.body.ano,
            dia: req.body.dia,
            primeiroEncontro: req.body.primeiroEncontro
        });

        await grupo.save();

        res.redirect("/grupos/cadastroCatequizandos/" + grupo._id);

    }


    // Abrir página para cadastrar catequizandos
    async cadastroCatequizandos(req, res) {

        const grupo = await Grupo.findById(req.params.id);

        const catequizandos = await Catequizando.find({
            grupo: req.params.id
        });

        res.render("grupos/cadastroCatequizandos", {
            grupo: grupo,
            catequizandos: catequizandos
        });

    }


    // Cadastrar catequizando
    async cadastrarCatequizando(req, res) {

        const catequizando = new Catequizando({

            nome: req.body.nome,

            telefone: req.body.telefone,

            responsavel: req.body.responsavel,

            grupo: req.params.id

        });

        await catequizando.save();

        res.redirect("/grupos/cadastroCatequizandos/" + req.params.id);

    }


    // Abrir página de edição
    async editar(req, res) {

        const grupo = await Grupo.findById(req.params.id);

        res.render("grupos/edt", {
            grupo: grupo
        });

    }


    // Atualizar grupo
    async atualizar(req, res) {

        await Grupo.findByIdAndUpdate(req.params.id, {

            nome: req.body.nome,

            ano: req.body.ano,

            dia: req.body.dia,

            primeiroEncontro: req.body.primeiroEncontro

        });

        res.redirect("/grupos/lst");

    }


    // Abrir página de confirmação de exclusão
    async excluirForm(req, res) {

        const grupo = await Grupo.findById(req.params.id);

        res.render("grupos/del", {
            grupo: grupo
        });

    }


    // Excluir grupo
    async excluir(req, res) {

        await Grupo.findByIdAndDelete(req.params.id);

        res.redirect("/grupos/lst");

    }

}