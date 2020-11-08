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
    const {id} = request.params;

    Task.findById(id)
    .then((task) =>{
        response.status(200).json(task)
    })
    .catch((err) => next(err));

}

const getCompletedTasks = (request, response) =>{
    Task.find({concluido: true})
    .then((completedTasks) =>{
        response.status(200).json(completedTasks)
    })
    .catch((err) => next(err));
}

const getUncompletedTasks = (request, response) =>{
    Task.find({concluido: false})
    .then((uncompletedTasks) =>{
        response.status(200).json(uncompletedTasks)
    })
    .catch((err) => next(err));
}

const createTask = (request, response)=>{
    let { descricao, nomeColaborador } = request.body

    const newTask = new Task({
        id: Math.random().toString(32).substr(2,9),
        dataInclusao: new Date().toString(),
        concluido: false,
        descricao: descricao,
        nomeColaborador: nomeColaborador
    });
    newTask.save()
        .then((res) => {
            response.status(201).json(res);
        })
        .catch(err => next(err));

}

const updateTask = (request, response) =>{
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

const finishTask = (request, response)=>{
    const { id } = request.params //pegando o valor do ID mandado na URL
    const { concluido } = request.body //pegando o valor de "concluido" enviado no Body

    Task.findById(id)
    .then((task)=> {
        if (task.concluido == false){
            Task.findByIdAndUpdate(id, { $set: { concluido }})
        .then((task) => {
            response.status(200).json({ message: `${request.params.id} task is finished.`});                               
        })
        .catch((err) => {
            response.json(err);
        });

        }else{
            response.status(400).send({mensagem: "Não é possível atualizar uma tarefa já concluída!" })
        }
    })
    .catch((err) =>{
        throw new Error(err);
    })


}

/* PATCH */
const updateCollaborator = (request, response) =>{
    const {id} = request.params;
    const {nomeColaborador} = request.body;

    Task.findById(id)
    .then((task) =>{
        if(task.concluido == false){
            task.findByIdAndUpdate(id, {$set: nomeColaborador = nomeColaborador})
        .then((task)=> {
            response.status(200).json({message: "O nome do colaborador foi atualizado! :D "})
        })
        .catch((err) => {
            response.json(err);
        });    
    
        }else{
            response.status(204).send({mensagem: "Não é possível corrigir o nome do colaborador de uma tarefa já concluída!"})
        }
    })
    .catch((err) =>{
        throw new Error(err);

    }); 

}

const deleteTask = (request, response)=>{
    const { id } = request.params

    Task.findById(id)
    .then((task)=> {
        if(task.concluido == true){
            Task.findByIdAndDelete(id)
            .then(() => {
                response.status(200).json('task deleted');
            })
            .catch((err) => {
                throw new Error(err);
            });
        }
    })
    .catch((err)=>{
        throw new Error(err);
    })
    
}

module.exports ={
    getAll,
    getById,
    getCompletedTasks,
    getUncompletedTasks,
    createTask,
    updateTask,
    finishTask,
    updateCollaborator,
    deleteTask
}



