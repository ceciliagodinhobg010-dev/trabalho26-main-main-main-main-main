import conexao from '../config/conexao.js';
import mongoose from 'mongoose';

const grupoSchema = new mongoose.Schema({
    nome: String,
    ano: Number,
    dia: String,
    primeiroEncontro: String
});

export default conexao.model('Grupo', grupoSchema);