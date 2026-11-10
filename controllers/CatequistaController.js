import Catequista from "../models/Catequista.js";

export default class CatequistaController {

    // LOGIN
    login(req, res) {

        res.render("catequista/login", {
            erro: ""
        });

    }


    // ENTRAR NO SISTEMA
    async entrar(req, res) {

        const usuario = req.body.usuario;
        const senha = req.body.senha;

        const catequista = await Catequista.findOne({
            usuario: usuario,
            senha: senha
        });

        if (!catequista) {

            return res.render("catequista/login", {
                erro: "Usuário ou senha incorretos!"
            });

        }

        res.render("catequista/perfil", {

            nome: catequista.nome,
            telefone: catequista.telefone,
            cidade: catequista.cidade,
            paroquia: catequista.paroquia,
            idade: catequista.idade,
            usuario: catequista.usuario,
            foto: ""

        });

    }


    // PÁGINA CRIAR CONTA
    criarConta(req, res) {

        res.render("catequista/criarConta");

    }


    // RECEBER DADOS DA CRIAÇÃO DA CONTA
    criar(req, res) {

        res.render("catequista/UsuarioESenha", {

            nome: req.body.nome,
            telefone: req.body.telefone,
            cidade: req.body.cidade || "",
            paroquia: req.body.paroquia,
            idade: req.body.idade

        });

    }


    // SALVAR USUÁRIO E SENHA
    async UsuarioESenha(req, res) {

        const nome = req.body.nome;
        const telefone = req.body.telefone;
        const cidade = req.body.cidade;
        const paroquia = req.body.paroquia;
        const idade = req.body.idade;

        const usuario = req.body.usuario;
        const senha = req.body.senha;
        const confirmar = req.body.confirmar;


        // VERIFICAR SENHAS
        if (senha !== confirmar) {

            return res.send("As senhas não coincidem!");

        }


        // CRIAR CATEQUISTA
        const catequista = new Catequista({

            nome: nome,
            telefone: telefone,
            cidade: cidade,
            paroquia: paroquia,
            idade: idade,
            usuario: usuario,
            senha: senha

        });


        // SALVAR NO MONGODB
        await catequista.save();


        // VOLTAR PARA O LOGIN
        res.redirect("/login");

    }


    // PERFIL
    perfil(req, res) {

        res.render("catequista/perfil", {

            nome: req.query.nome || "",
            telefone: req.query.telefone || "",
            cidade: req.query.cidade || "",
            paroquia: req.query.paroquia || "",
            idade: req.query.idade || "",
            usuario: req.query.usuario || "",
            foto: req.query.foto || ""

        });

    }


    // EDITAR PERFIL
    edt(req, res) {

        res.render("catequista/edt", {

            nome: req.query.nome || "",
            telefone: req.query.telefone || "",
            cidade: req.query.cidade || "",
            paroquia: req.query.paroquia || "",
            idade: req.query.idade || "",
            usuario: req.query.usuario || "",
            foto: req.query.foto || ""

        });

    }


    // SALVAR EDIÇÃO
    salvarEdicao(req, res) {

        res.redirect(
            "/perfil" +
            "?nome=" + req.body.nome +
            "&telefone=" + req.body.telefone +
            "&cidade=" + req.body.cidade +
            "&paroquia=" + req.body.paroquia +
            "&idade=" + req.body.idade +
            "&usuario=" + req.body.usuario
        );

    }


    // EXCLUIR PERFIL
    excluir(req, res) {

        res.redirect("/login");

    }


    // PÁGINA DE EXCLUSÃO
    del(req, res) {

        res.render("catequista/del");

    }


    // ÁREA INICIAL
    inicio(req, res) {

        res.render("catequista/catequistaInicial");

    }

}