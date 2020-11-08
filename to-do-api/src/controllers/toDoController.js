const tarefasModels = require('../models/tarefas.json');
const mongoose = require('mongoose');
const Task = require('../models/Tarefas');

// GET
const getAll = function (request, response) {
    Task.find()
        .then((tasks) => {response.status(200).json(tasks)})
        .catch(err => next(err));
}
const getDone = (request, response) => {
    Task.find({ concluido: true })
        .then((tasks) => { response.status(200).json(tasks) })
        .catch(err => next(err));
}
const getNotDone = (request, response) => {
    Task.find({ concluido: false })
        .then((tasks) => { response.status(200).json(tasks) })
        .catch(err => next(err));
}
const getByID = (request, response) => {
    const { id } = request.params;
    Task.findById(id)
        .then((task) => { response.status(200).json(task) })
        .catch(err => next(err));
}

//Post
const createTarefa = (request, response) => {
    const { descricao, nomeColaborador } = request.body;
    const newTask = new Task({
        descricao: descricao,
        nomeColaborador: nomeColaborador
    })
    newTask.save()
        .then((res) => {
            response.status(201).json(res);
        })
        .catch(err => next(err))

}

//Put
const updateTarefa = (request, response) => {
    const { id } = request.params;
    let teste = false;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(400).json({ message: 'ID não é válido.' })
        return
    }     //Verifica se o ID é válido


    Task.findById(id)
        .then((task) => {
            if (task.concluido === false) {
                Task.findByIdAndUpdate(id, request.body)
                    .then(() => { response.status(200).json(`${request.params.id} foi atualizado com sucesso!`) })
                    .catch((err) => next(err))
            } else {
                response.status(400).json({ message: `Você não pode alterar tarefas concluídas.` })
            }
        })
        .catch((err) => next(err))

}
//patch
const completeTarefa = (request, response) => {
    const { id } = request.params;
    const { concluido } = request.body;

    Task.findById(id)
        .then((task) => {
            if (!task.concluido) {
                Task.findByIdAndUpdate(id, { $set: { concluido: concluido } })
                    .then(() => { response.status(200).json({ message: `${request.params.id} foi finalizada!` }) })
            } else {
                response.status(400).json({ message: `Esta tarefa já foi concluída!` })
            }
        })
        .catch((err) => response.status(400).json({ message: `Este ID não foi encontrado em nossa base ${err}` }))


}
const updateColaborador = (request, response) => {
    const { id } = request.params;
    const { nomeColaborador } = request.body;
    Task.findById(id)
        .then((task) => {
            if (!task.concluido) {
                Task.findByIdAndUpdate(id, { $set: { nomeColaborador: nomeColaborador } })
                    .then(() => { response.status(200).json({ message: `O nome do colaborador foi alterado!` }) })
                    .catch((err) => next(err))
            } else {
                response.status(400).json({ message: `Você não pode alterar tarefas já concluídas...` })
            }
        })
        .catch(err => { throw new Errow(err) })

}

const deleteTarefa = (request, response) => {
    const { id } = request.params;
    Task.findById(id)
        .then((task) => {
            if (!task.concluido) {
                Task.findByIdAndDelete(id)
                    .then(() => { response.status(200).json({ message: `A tarefa (id: ${id}) foi deletada com sucesso!` }) })
                    .catch((err) => next(err))
            } else {
                response.status(400).json({ message: `Você não pode alterar tarefas já concluídas...` })
            }
        })
        .catch(err => { throw new Errow(err) })
}

module.exports = {
    getAll,
    getDone,
    getNotDone,
    getByID,
    createTarefa,
    updateTarefa,
    completeTarefa,
    updateColaborador,
    deleteTarefa

}