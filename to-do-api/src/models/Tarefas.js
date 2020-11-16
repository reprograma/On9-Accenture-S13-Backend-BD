const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    concluido: { type: Boolean, default: false },
    descricao: String,
    nomeColaborador: { type: String, require: true },
  },
  { timestamps: true }
); //data de criação e atualização

const Tarefas = mongoose.model("Tarefas", userSchema);

module.exports = Tarefas;
