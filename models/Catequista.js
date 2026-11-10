import mongoose from "mongoose";

const CatequistaSchema = new mongoose.Schema({

    nome: String,
    telefone: String,
    cidade: String,
    paroquia: String,
    idade: Number,
    usuario: String,
    senha: String

});

export default mongoose.model("Catequista", CatequistaSchema);