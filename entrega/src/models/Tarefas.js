const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    concluido: { type: Boolean, default: false },
    descricao: String,
    nomeColaborador: { type: String, required: true }
},
{timestamps:true}); //Propriedade  que retorna a data de criação e data de atualização

const Tarefas = mongoose.model('Tarefas', userSchema);
module.exports = Tarefas;