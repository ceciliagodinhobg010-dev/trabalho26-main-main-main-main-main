import Material from '../models/Material.js';
import fs from 'fs';

export default class MaterialController {

constructor(caminhoBase = 'material/') {

    this.caminhoBase = caminhoBase;

    this.home = async (req, res) => {
    try {
        const resultado = await Material.find({});

        res.render(caminhoBase + 'index', {
            titulo: 'Acutis IVC | Materiais',
            materiais: resultado
        });

    } catch (error) {
        console.log(error);
        res.send('Erro ao buscar materiais');
    }
    };

    this.openAdd = async (req, res) => {
        res.render(caminhoBase + 'add', {
            titulo: 'Acutis IVC | Materiais'
        });

    };

    this.add = async (req, res) => {

    try {

        const arquivo = req.files.arquivo[0].filename;
        let capa = null;
        let capaTipo = null;

        if (req.files.capa) {
            capa = fs.readFileSync(req.files.capa[0].path);
            capaTipo = req.files.capa[0].mimetype;
        }

        await Material.create({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            categoria: req.body.categoria,
            arquivo: arquivo,
            capa: capa,
            capaTipo: capaTipo
        });

        res.redirect('/materiais/lst');

    } catch (error) {
        console.log(error);
        res.send('Erro ao salvar material');

    }

    };

    this.capa = async (req, res) => {

    const material = await Material.findById(req.params.id);

    if (!material || !material.capa) {
        return res.status(404).end();
    }

    res.type(material.capaTipo);
    res.send(material.capa);

    };

    this.list = async (req, res) => {

        try {

            const resultado = await Material.find({});
            res.render(caminhoBase + 'lst', {
                materiais: resultado
            });

        } catch (error) {
            console.log(error);
            res.send('Erro ao buscar materiais');
        }
    };

    this.find = async (req, res) => {

    try {

        const filtro = req.body.filtro;

        const resultado = await Material.find({
            titulo: {
                $regex: filtro,
                $options: 'i'
            }
        });

        res.render(caminhoBase + 'index', {
            titulo: 'Acutis IVC | Materiais',
            materiais: resultado
        });

    } catch (error) {

        console.log(error);
        res.send('Erro ao pesquisar materiais');

    }

};
    this.openEdt = async (req, res) => {
        const id = req.params.id;
        const material = await Material.findById(id);
        res.render(caminhoBase + 'edt', {
            material: material
        });
    };

    this.edt = async (req, res) => {

    try {

        const dados = {
            titulo: req.body.titulo,
            descricao: req.body.descricao
        };

        if (req.files.arquivo) {
            dados.arquivo = req.files.arquivo[0].filename;
        }

        if (req.files.capa) {
            dados.capa = fs.readFileSync(req.files.capa[0].path);
            dados.capaTipo = req.files.capa[0].mimetype;
        }

        await Material.findByIdAndUpdate(
            req.params.id,
            dados
        );

        res.redirect('/materiais/lst');

        } catch (error) {

            console.log(error);
            res.send('Erro ao editar material');

        }

    };

    this.del = async (req, res) => {
        await Material.findByIdAndDelete(
            req.params.id
        );
        res.redirect('/materiais/lst');
    };

}

}
