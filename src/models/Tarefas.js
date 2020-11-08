const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    concluido: { type: Boolean, default: false },
    descricao: String,
    colaborador: { type: String, required: true },
    },
    { timestamps: true }); // Fica relacionado a propriedade 'timestamps' e ele já preenche a data de criação e data de atualização

const Tarefas = mongoose.model('Tarefas', userSchema); // Transformando em um modelo do mongoose

module.exports = Tarefas; 