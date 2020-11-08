const { response, request } = require("express")
const mongoose = require('mongoose');
const tarefasModels = require("../models/tarefas.json")
const Task = require('../models/Tarefas');

const getAll = (request, response)=>{
    //response.status(200).send(tarefasModels)

    Task.find()
    .then((tasks) => {
        response.status(200).json(tasks);
    })
    .catch(err => next(err));
    
}

const criarTarefa = (request, response, next)=>{
    let { descricao, nomeColaborador } = request.body
    const newTask = new Task({
    descricao,
    nomeColaborador,
    });

    newTask.save()
    .then((res)) => {
        response.status(201).json(res);
    })
    .catch(err => next(err));

    /* const novaTarefa ={
        id: Math.random().toString(32).substr(2,9),
        dataInclusao: new Date().toString(),
        concluido: false,
        descricao: descricao,
        nomeColaborador: nomeColaborador
    }

    tarefasModels.push(novaTarefa); */

    /* response.status(201).json(novaTarefa)  */
}

const atualizarTarefa = (request, response) =>{
    const { id } = request.params //pega o ID na URL
   // const { concluido, descricao, nomeColaborador } = request.body //pega os dados enviados pelo usuário no body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    Task.finByIdAndUpdate(id, request.body)
    .then(() => {
        response.status(200).json({ message: ` ${request.params.id} is update successfully.` });
    })
    .catch((err) => {
        response.json(err);
    });

}

   /*  const tarefaAtualizada = tarefasModels.find(tarefa => tarefa.id == id) //procura a tarefa q será atualizada

    const novaTarefa = { //construir o novo objeto editado
        id: tarefaAtualizada.id, //manter o id que já existe
        dataInclusao: tarefaAtualizada.dataInclusao, //manter a data que já existe
        concluido: concluido, //adicionando o valor "concluido" que foi mandado pelo usuario
        descricao: descricao, //adicionando o valor "descricao" que foi mandado pelo usuario
        nomeColaborador: nomeColaborador //adicionando o valor "nomeColaborador" que foi mandado pelo usuario
    }

    const index = tarefasModels.indexOf(tarefaAtualizada) //procuro a posição dentro do JSON do objeto que será atualizado

    tarefasModels[index] = novaTarefa //atribuindo a antiga tarefa a nova que construimos

    response.status(200).json(tarefasModels[index])
 */

const concluirTarefa = (request, response)=>{
    const { id } = request.params //pegando o valor do ID mandado na URL
    const { concluido } = request.body //pegando o valor de "concluido" enviado no Body

   /*  const tarefa = tarefasModels.find(tarefa => tarefa.id == id)//encontrando a tarefa referente ao ID

    tarefa.concluido = concluido//atualizando o campo "concluido" no nosso JSON

    response.status(200).json({
        mensagem: "Tarefa concluida",
        tarefa
    }) */

    Task.findByIdAndUpdate(id, { $set: { concluido }})
    .then((task) => {
        response.status(200).json ({ message: `${request.params.id} task is finished.`});
    })
    .catch((err) => {
        response.json(err);
    });

}

const deletarTarefa = (request, response)=>{
    const { id } = request.params
    /* const tarefaFiltrada = tarefasModels.find(tarefa => tarefa.id == id)

    const index = tarefasModels.indexOf(tarefaFiltrada)
    tarefasModels.splice(index, 1)

    response.json({mensagem: "Tarefa deletada com sucesso"})
} */

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
    criarTarefa,
    deletarTarefa,
    atualizarTarefa,
    concluirTarefa
}