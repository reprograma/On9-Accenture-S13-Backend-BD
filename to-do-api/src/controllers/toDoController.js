const { response, request } = require("express")
const mongoose = require ('mongoose')
const tarefasModels = require("../models/tarefa.json")
const Task = require('../models/Tarefa')

const getAll = (request, response)=>{
    //response.status(200).send(tarefasModels)
    Task.find()
        .then((tasks) => {
            response.status(200).json(tasks);
        })
        .catch(err => next (err));
}

const getID =  (request,response) =>{
    const{id} = request.params
    /*const tarefaEscolhida = tarefasModels.find(tarefa => tarefa.id == id);
    response.status(200).send(tarefaEscolhida)*/
    Task.find(id)
        .then((tasks) => {
            response.status(200).json(tasks);
        })
        .catch(err => next (err));
}

const getTarefaConcluida = (request,response) =>{
    /*const tarefasConcluidas = tarefasModels.filter(tarefa => tarefa.concluido == true);
    response.status(200).send(tarefasConcluidas)*/
    Task.find({concluido: true })
        .then((tasks) => {
            response.status(200).json(tasks);
        })
        .catch(err => next (err));
    
}

const getTarefaNaoConcluida = (request, response) =>{
    /*const tarefasNaoConcluidas = tarefasModels.filter(tarefa => tarefa.concluido == false);
    response.status(200).send(tarefasNaoConcluidas)*/
    Task.find({concluido: false })
        .then((tasks) => {
            response.status(200).json(tasks);
        })
        .catch(err => next (err));
}

const criarTarefa = (request, response)=>{
    let { descricao, nomeColaborador } = request.body

    const NewTask = new Task({
        descricao,
        nomeColaborador,
    });

    NewTask.save()
        .then((res) => {
            response.status(201).json(res);
        })
        .catch(err => next (err));
}

const atualizarTarefa = (request, response) =>{
    const { id } = request.params //pega o ID na URL

    if(!mongoose.Types.ObjectId.isValid(id)){
        response.status(400).json({ message: 'Esse ID não é válido'});
        return;
    }

    Task.findByIdAndUpdate (id, request.body)
        .then(() => {
            response.status(200).json({ message: `${request.params.id} Tarefa atualizada.`});
        })
        .catch ((err) => {
            response.json(err);
        });
}     

const concluirTarefa = (request, response)=>{
    const { id } = request.params //pegando o valor do ID mandado na URL

    const { concluido } = request.body //pegando o valor de "concluido" enviado no Body

    Task.findByIdAndUpdate( id, {$set: {concluido }})
        .then((task) => {
            response.status(200).json({ message: `${request.params.id} Tarefa concluida.`})
        })
        .catch((err) => {
            response.json(err);
        });
}

const corrigirResponsavel = (request,response) =>{
    const {id} = request.params
    const {nomeColaborador} = request.body

    /*const tarefa = tarefasModels.find(tarefa => tarefa.id == id)
    if(tarefa.concluido == true){
        response.json({Erro: "Impossível atualizar uma tarefa que já foi concluida"})
    }else{    
    tarefa.nomeColaborador = nomeColaborador
    }
    response.status(200).json({
        mensagem: "Nome do Colaborador foi modificado",
        tarefa
    })*/

    Task.findByIdAndUpdate( id, {$set: {nomeColaborador: nomeColaborador }})
        .then((task) => {
            response.status(200).json({ message: `${request.params.id} Nome do Colaborador foi modificado.`})
        })
        .catch((err) => {
            response.json(err);
        });
}    



const deletarTarefa = (request, response)=>{
    const { id } = request.params

    Task.findByIdAndDelete(id)
        .then(() => {
            response.status(200).json('Tarefa deletada')
        })
        .catch((err) => {
            throw new Error(err);
        })
    /*const tarefaFiltrada = tarefasModels.find(tarefa => tarefa.id == id)

    const index = tarefasModels.indexOf(tarefaFiltrada)
    tarefasModels.splice(index, 1)

    response.json({mensagem: "Tarefa deletada com sucesso"})*/
}

module.exports = {
    getAll,
    getID,
    getTarefaConcluida,
    getTarefaNaoConcluida,
    criarTarefa,
    atualizarTarefa,
    concluirTarefa,
    corrigirResponsavel,
    deletarTarefa
    
}


