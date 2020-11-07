const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    concluido: { type: Boolean, default: false },
    descricao: String,
    nomeColaborador: { type: String, require: true},
},
{ timestamps: true });

const Tarefas = mongoose.model('Tarefas', UserSchema);

module.exports = Tarefas;