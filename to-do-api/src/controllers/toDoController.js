// const { response, request } = require("express")
const mongoose = require('mongoose');
const Task = require('../models/Tarefas');
const tarefasModels = require("../models/tarefas.json")

const getAll = (request, response)=>{
    Task.find()
    .then((tasks) => {
        response.status(200).json(tasks);
    })
    .catch(err => next(err));
}

const getConcluida = (request, response) => {
    Task.find({ concluido: true })
        .then((tasks) => {
             response.status(200).json(tasks);        
        })
        .catch((err) => {
            response.json(err);
    })
}

const getNaoConcluida = (request, response) => {
    Task.find({ concluido: false })
        .then((tasks) => {
            response.status(200).json(tasks);
        })
        .catch((err) => {
            next(err);
    })
}

const getById = (request, response) => {
    const { id } = request.params
    Task.findById(id)
        .then((tasks) => {
            response.status(200).json(tasks);
        })
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
        .catch(err => next(err)); // next é um middleware, como se desse permissão para a aplicação seguir após uma tomada de decisão. Geralmente utilizado quando você quer, por exemplo, barrar algum tipo de requisição ou fazer uma validação importante.
}

const atualizarTarefa = (request, response) =>{
    const { id } = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    Task.findById(id)
        .then((task) => {
            if(task.concluido == true) {
                response.status(200).json({ message: `Impossível atualizar tarefas concluídas.` });
            } else {
                Task.findByIdAndUpdate(id, request.body)
                    .then(() => {
                        response.status(200).json({ message: `${request.params.id} is updated successfully.` });
                    })
                    .catch((err) => {
                        response.json(err);
                    });    
            }
        })
        .catch((err) => {
            response.json(err);
        });

    // Sem a validação
    // Task.findByIdAndUpdate(id, request.body)
    //     .then(() => {
    //         response.status(200).json({ message: `${request.params.id} is updated successfully.` });
    //     })
    //     .catch((err) => {
    //         response.json(err);
    //     });    
}

const concluirTarefa = (request, response)=>{
    const { id } = request.params
    const { concluido } = request.body

    Task.findById(id)
        .then((task) => {
            if(task.concluido == true) {
                response.status(200).json({ message: `A tarefa não pode ser concluida.` });
            } else {
                Task.findByIdAndUpdate(id, { $set: { concluido }})
                    .then((task) => {
                        response.status(200).json({ message: `${request.params.id} task is finished.` });
                    })
                    .catch((err) => {
                        response.json(err);
                    });
            }
        })
        .catch((err) => {
            response.json(err);
        });
    
}

const atualizarColaborador = (request, response) => {
    const { id } = request.params
    const { nomeColaborador } = request.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    Task.findById(id)
        .then((task) => {
            if(task.concluido == true) {
                response.status(200).json({ message: `Não é possível atualizar o responsável, pois está tarefa já foi concluída.` });
            } else {
                Task.findByIdAndUpdate(id, { $set: { nomeColaborador }}) // set: qual campo vai querer atualizar
                    .then(() => {
                        response.status(200).json({ message: `${request.params.id} is updated successfully.` });
                    })
                    .catch((err) => {
                        response.json(err);
                    });    
            }
        })
        .catch((err) => {
            response.json(err);
        });
}

const deletarTarefa = (request, response)=>{
    const { id } = request.params

    Task.findById(id)
    .then((task) => {
        if(task.concluido == true) {
            response.status(200).json({ message: `Impossível deletar tarefas concluídas.` });
        } else {
            Task.findByIdAndDelete(id)
                .then(() => {
                    response.status(200).json({ message: `task deleted.` });
                })
                .catch((err) => {
                    throw new Error(err);
                });    
        }
    })
    .catch((err) => {
        response.json(err);
    });
    // Sem validação
    // Task.findByIdAndDelete(id)
    // .then(() => {
    //     response.status(200).json('task deleted');
    // })
    // .catch((err) => {
    //     throw new Error(err);
    // });
}

module.exports = {
    getAll,
    getConcluida,
    getNaoConcluida,
    getById,
    criarTarefa,
    deletarTarefa,
    atualizarTarefa,
    atualizarColaborador,
    concluirTarefa
}