const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  concluido: { type: Boolean, default: false },
  descricao: String,
  nomeColaborador: { type: String, required: true },
  },
  { timestamps: true }); //atualiza e cria sozinho a data e hora da criação

const Tarefas = mongoose.model('Tarefas', userSchema);

module.exports = Tarefas;
