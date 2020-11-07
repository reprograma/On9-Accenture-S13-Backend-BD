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

const getById = (request, response) =>{
    const { id } = request.params 

    Task.findById(id)
        .then((tasks)=>{
            response.status(200).json(tasks);
        })
        .catch(err => {throw new Error(err)});
}

const getConcluidas = (request, response) =>{
    Task.find({ concluido: true})
        .then((tasks)=>{
            response.status(200).send(tasks);
        })
        .catch(err => next (err));
}

const getNaoConcluidas = (request, response) =>{
    Task.find({ concluido: false})
        .then((tasks) =>{
            response.status(200).send(tasks);
        })
        .catch(err => next (err));
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
    
    Task.findByIdAndUpdate(id, request.body)
        .then(() => {
            response.status(200).json({ message: ` ${request.params.id} is updated successfully.` });
        })
        .catch((err) => {
            response.json(err);
        });
   
}

const concluirTarefa = (request, response)=>{
    const { id } = request.params //pegando o valor do ID mandado na URL
    const { concluido } = request.body //pegando o valor de "concluido" enviado no Body

    Task.findByIdAndUpdate(id, { $set: { concluido }})
        .then((task) => {
            response.status(200).json({ message: `${request.params.id} task is finished.`});                               
        })
        .catch((err) => {
            response.json(err);
        });

}

const corrigirResponsavel = (request, response) =>{
    const { id } = request.params
    const { nomeColaborador } = request.body

    Task.findById(id)
        .then((task) =>{
            if (task.concluido == false) {
                Task.findByIdAndUpdate(id, {$set: { nomeColaborador: nomeColaborador }})
                    .then((task)  =>{
                        response.status(200).json({ message: `${request.params.id} o colaborador foi atualizado`});
            })
            
                    .catch((err) => next(err));
            
            }  else {
                response.status(400).json({ message: `${request.params.id} cannot be updated because it's already finished`});
            }
        
        })
        .catch(err => { throw new Errow(err) })
    } 
    

const deletarTarefa = (request, response)=>{
    const { id } = request.params
    
    Task.findByIdAndDelete(id)
        .then(() => {
            response.status(200).json('task deleted');
        })
        .catch((err) => {
            throw new Error(err);
        });
}

module.exports ={
    getAll,
    getById,
    getConcluidas,
    getNaoConcluidas,
    criarTarefa,
    corrigirResponsavel,
    deletarTarefa,
    atualizarTarefa,
    concluirTarefa
}

