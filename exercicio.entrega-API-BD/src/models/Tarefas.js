const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    concluido: { type: Boolean, default: false },
    descricao: String,
    nomeColaborador: { type: String, required: true },
},
{ timestamps: true});

const Tarefas = mongoose.model('Tarefas', userSchema);

module.exports = Tarefas;
