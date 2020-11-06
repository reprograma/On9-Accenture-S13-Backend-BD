# On9-Accenture-S13-Backend-BD

<<<<<<< HEAD

const { response, request } = require("express")
const mongoose = require('mongoose');
const tarefasModels = require("../models/tarefas.json")
const Task = require('../models/Tarefas');

const getAll = (request, response)=>{
    Task.find()
    .then((tasks)=>{
        response.status(200).json(tasks);
    })
    .catch(err => next(err));
}

const getCompleted = (request,response)=>{
    Task.find({concluido: true})
        .then((tarefa)=>{
        response.status(200).json(tarefa);
    })
        .catch((err)=>{
        response.json(err);
    })
}

const getUncompleted = (request,response)=>{
    Task.find({concluido: false})
        .then((tarefa)=>{
        response.status(200).json(tarefa);
    })
        .catch((err)=>{
        response.json(err);
    })
}

const getId = (request, response)=>{
    const {id} = request.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        response.status(400).json({message: 'Specified id is not valid'});
        return;
    }
    Task.findById(id)
        .then((tarefa)=>{
            response.status(200).json(tarefa);
        })
        .catch((err)=>{
            response.json(err);
        })

}

const criarTarefa = (request, response)=>{
    let { descricao, nomeColaborador } = request.body
    const newTask = new Task({
        descricao,
        nomeColaborador,
    });

    newTask.save()
        .then((res)=>{
            response.status(201).json(res);
        })
        .catch(err => next(err));
}

const atualizarTarefa = (request, response) =>{
    const { id } = request.params 

    if({concluido:true}){
        response.status(200).json({message: `tarefa nao pode ser atualizada`});
        return;
    }
    Task.findByIdAndUpdate(id, request.body)
        .then(()=>{
            response.status(200).json({message: `${request.params.id} is updated successfuly.`});
        })
        .catch((err)=>{
            response.json(err);
        })
}

const concluirTarefa = (request, response)=>{
    const { id } = request.params
    const { concluido } = request.body
    if({concluido:true}){
        response.status(200).json({message: `tarefa nao pode ser atualizada`});
        return;
    }
    Task.findByIdAndUpdate(id, { $set: {concluido}})
        .then(()=>{
            response.status(200).json({message: `${request.params.id} is updated successfuly.`});
        })
        .catch((err)=>{
            response.json(err);
        })

}

const deletarTarefa = (request, response)=>{
    const { id } = request.params

    Task.findByIdAndDelete(id)
    .then(()=>{
        response.status(200).json('task deleted');
    })
    .catch((err)=>{
        throw new Error(err);
    });
}

module.exports ={
    getAll,
    getId,
    getCompleted,
    getUncompleted,
    criarTarefa,
    deletarTarefa,
    atualizarTarefa,
    concluirTarefa
}
=======
## Introdução

Estamos de volta com nosso BD + Backend! :wink:

Aprendemos sobre requisições assincronas, promisses e transformamos nosso to-do-list para deixar de usar o arquivo Json e integrar o nosso BD.

## Requisitos

- Fork este repositório
- Clone este repositório


## Exercicío da Semana e Entregáveis

A Semana 11 teve como principal exercicio extender o CRUD da antiga to-do-list que utilizava o arquivo Json. Como entregável desejo obter o mesmo backend porém com todas as atividades da Semana
11 sendo consultadas no Banco de dados. Caso seja necessário crie models e se sinta livre com as consultas.

## Bônus

Entregar todas as integrações com o máximo de validação do dados possível!!!!!
>>>>>>> fc02642ebcfb217ec42fb2353baf238859f9791f
