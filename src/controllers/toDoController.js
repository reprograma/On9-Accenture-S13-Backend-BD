const { response, request } = require("express")
const mongoose = require('mongoose');
const Task = require('../models/Tarefas');

const getAll = (request, response)=>{
    Task.find()
        .then((tasks) => {
            response.status(200).json(tasks);
        })
        .catch(err => next(err));
}

const getConcluidas = (request, response)=>{
    Task.find({ concluido: true })
        .then((tasks) => { response.status(200).json(tasks) })
        .catch(err => next(err));
}
const getNaoConcluidas = (request, response) => {
    Task.find({ concluido: false })
        .then((tasks) => { response.status(200).json(tasks) })
        .catch(err => next(err))
}

const getById = (request, response) => {
    const { id } = request.params;
    Task.findById(id)
        .then((task) => { response.status(200).json(task) })
        .catch(err => next(err));
}


const criarTarefa = (request, response)=>{
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

const atualizarTarefa = (request, response) =>{
    const { id } = request.params //pega o ID na URL
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    
    Task.findById(id)
        .then((tarefa) => {
            if (tarefa.concluido === false) {
                Task.findByIdAndUpdate(id, request.body)
                    .then(() => { response.status(200).json(`${request.params.id} was sucessfully updated`) })
                    .catch((err) => next(err))
            } else {
                response.status(400).json({ message: `You cannot update finished tasks` })
            }
        })
        .catch((err) => next(err))
    }



const atualizarColaborador = (request, response) => {
    const { id } = request.params;
    const { nomeColaborador } = request.body;
    Task.findById(id)
        .then((tarefa) => {
            if (!tarefa.concluido) {
                Task.findByIdAndUpdate(id, { $set: { nomeColaborador: nomeColaborador } })
                    .then(() => { response.status(200).json({ message: `'nomeColaborador' was sucessfully updated` }) })
                    .catch((err) => next(err))
            } else {
                response.status(400).json({ message: `You cannot update finished tasks` })
            }
        })
        .catch(err => { throw new Errow(err) })

}

const concluirTarefa = (request, response) => {
    const { id } = request.params;
    const { concluido } = request.body;


    Task.findById(id)
        .then((tarefa) => {
            if (!tarefa.concluido) {
                Task.findByIdAndUpdate(id, { $set: { concluido: concluido } })
                    .then(() => { response.status(200).json({ message: `${request.params.id} is finished` }) })
            } else {
                response.status(400).json({ message: `This task has been already finished` })
            }
        })
        .catch((err) => response.status(400).json({ message: `This task cannot be found in our database ${err}` }))
}

const deletarTarefa = (request, response) => {
    const { id } = request.params;
    Task.findById(id)
        .then((tarefa) => {
            if (!tarefa.concluido) {
                Task.findByIdAndDelete(id)
                    .then(() => { response.status(200).json({ message: `The task (id: ${id}) was sucessfully deleted` }) })
                    .catch((err) => next(err))
            } else {
                response.status(400).json({ message: `You cannot delete tasks that have been already finished` })
            }
        })
        .catch(err => { throw new Errow(err) })
}


module.exports ={
    getAll,
    criarTarefa,
    deletarTarefa,
    atualizarTarefa,
    concluirTarefa,
    getConcluidas,
    getNaoConcluidas,
    atualizarColaborador,
    getById
}



