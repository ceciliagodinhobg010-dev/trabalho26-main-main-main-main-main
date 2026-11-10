import mongoose from "mongoose";

const CatequizandoSchema = new mongoose.Schema({


id: Number,

nome: String,

telefone: String,

responsavel: String,

foto: String,

grupo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grupo"
}


});

export default mongoose.model(
"Catequizando",
CatequizandoSchema
);
