import conexao from '../config/conexao.js'

const Material = conexao.Schema({
    id: Number,
    titulo: {type: String, required: true},
    descricao: String,
    arquivo: String, 
    categoria: String,
    capa: {type: Buffer},
    capaTipo: String
});

export default conexao.model('Material',Material)