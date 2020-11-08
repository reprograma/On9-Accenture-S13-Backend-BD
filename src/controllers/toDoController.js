// const { response } = require("express")
// const { request } = require("../app")
const mongoose = require('mongoose')
const Task = require('../models/Tarefas')
const tarefaModels = require("../models/tarefasModels.json")

const getAll = (request, response) => {
    Task.find()
    .then((tasks) => {
        response.status(200).send(tasks)
    })

    .catch(err => next(err))
    
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


const createTarefa = (request, response) => {
    let {descricao, colaborador} = request.body
    const newTask = new Task({
        descricao,
        colaborador,
    })

    newTask.save()
        .then((res) => {
            response.status(201).json(res);
        })
        .catch(err => next(err)); 
        // next é um middleware
        // ele da permissão para a aplicação seguir após uma tomada de decisão. 
        //Geralmente eh utilizado quando, por exemplo, impedir algum tipo de requisição
        // ou faz alguuma validação importante.

    //console.log(novaTarefa)
}

const putTarefa = (request, response) => {
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
    
        // -------SEM A VALIDACAO--------
     // Task.findByIdAndUpdate(id, request.body)
    //     .then(() => {
    //         response.status(200).json({ message: `${request.params.id} is updated successfully.` });
    //     })
    //     .catch((err) => {
    //         response.json(err);
    //     });    

}

const concluirTarefa = (request, response) => {
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

const putColaborador = (request, response) => {
    const { id } = request.params
    const { colaborador } = request.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    Task.findById(id)
        .then((task) => {
            if(task.concluido == true) {
                response.status(200).json({ message: `Não é possível atualizar o responsável, pois está tarefa já foi concluída.` });
            } else {
                Task.findByIdAndUpdate(id, { $set: { colaborador }}) // set: qual campo vai querer atualizar
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


const deleteTarefa = (request, response) => {
    const {id} = request.params
    const tarefaFiltrada = tarefaModels.find(tarefa => tarefa.id == id)

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

    // -------- Sem a validação -----------
    // Task.findByIdAndDelete(id)
    // .then(() => {
    //     response.status(200).json('task deleted');
    // })
    // .catch((err) => {
    //     throw new Error(err);
    // });

// const index = tarefaModels.indexOf(tarefaFiltrada)

// tarefaModels.splice(index, 1)
// // console.log(tarefaModels)
// response.json({mensagem: "excluido"})

    //const index = tarefaModels.indexOf(tarefaFiltrada)
}


module.exports = {
    getAll,
    getConcluida,
    getNaoConcluida,
    getById,
    createTarefa,  
    putTarefa, 
    putColaborador,
    concluirTarefa,
    deleteTarefa
}