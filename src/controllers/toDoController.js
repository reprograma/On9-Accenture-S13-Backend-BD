const { response, request } = require("express")
const mongoose = require("mongoose");
const tarefasModels = require("../models/tarefas.json")
const Task = require("../models/Tarefas");

const getAll = (request, response) => {    
    Task.find()
        .then((tasks) => {
            response.status(200).json(tasks);
        })
        .catch(err => next(err));
}

const criarTarefa = (request, response) => {
    let { descricao, nomeColaborador } = request.body   

    const newTask = new Task({
        descricao,
        nomeColaborador,
    });

    newTask.save()
        .then((res) => {
            response.status(201).json(res);
        })
        .catch(err => next(err));
}

const atualizarTarefa = (request, response) => {
    const { id } = request.params       

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(400).json({ message: 'Specified id is not valid' })
        return;
    }

    Task.findById(id)
        .then((task) => {
            Task.findByIdAndUpdate(id, request.body)
                .then(() => {
                    response.status(200).json({ message: `${request.params.id} is updated` })

                })
                .catch((err) => {
                    response.json(err);
                })
        })
        .catch((error) => {
            response.json({ message: "Não pode atualizar tarefas concluidas" })
        })

}

const concluirTarefa = (request, response) => {
    const { id } = request.params 
    const { concluido } = request.body 

    Task.findByIdAndUpdate(id, { $set: { concluido } })
        .then((task) => {
            response.status(200).json({ message: `${request.params.id} task is finished` })
        })
        .catch((err) => {
            response.json(err);
        })



}

const deletarTarefa = (request, response) => {
    const { id } = request.params
        
    Task.findByIdAndDelete(id)
        .then(() => {
            response.status(200).json('task deleted');
        })
        .catch((err) => {
            throw new Error(err);
        })
}

module.exports = {
    getAll,
    criarTarefa,
    deletarTarefa,
    atualizarTarefa,
    concluirTarefa
}