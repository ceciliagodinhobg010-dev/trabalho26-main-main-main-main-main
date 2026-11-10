import Material from '../models/Material.js';

export default class GeralController {

    constructor() {

        this.home = async (req, res) => {
            try {

                const materiais = await Material.find();

                res.render('index', {
                    materiais
                });

            } catch (error) {
                console.error(error);

                res.render('index', {
                    materiais: []
                });
            }
        };


        this.openAdd = (req, res) => {

            res.render('material/add', {
                titulo: 'Acutis IVC | Materiais'
            });

        };


        this.add = (req, res) => {

            console.log('Material recebido');

            res.redirect('/materiais/add');

        };


        this.teste = async (req, res) => {

            const resultado = "teste";

            res.render('index2', {
                teste: resultado
            });

        };


        this.formulario = async (req, res) => {

            res.render('index');

        };

    }

}