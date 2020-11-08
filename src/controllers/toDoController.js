const { response, request } = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Tarefas");

const getAll = (request, response) => {
  Task.find()
    .then((tasks) => {
      response.status(200).json(tasks);
    })
    .catch((err) => next(err));
};

const criarTarefa = (request, response) => {
  let { descricao, nomeColaborador } = request.body;

  const newTask = new Task({
    //cria nova tarefa
    descricao,
    nomeColaborador,
  });

  newTask
    .save()
    .then((res) => {
      response.status(201).json(res);
    })
    .catch((err) => next(err));
};

const atualizarTarefa = (request, response) => {
  const { id } = request.params; //pega o ID na URL

  if (!mongoose.Types.ObjectId.isValid(id)) {
    // verifica se o valor passado é um ID e, se é válido no BD
    response.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Task.findByIdAndUpdate(id, request.body) // método que encontra e atualiza por ID
    .then(() => {
      response
        .status(200)
        .json({ message: ` ${request.params.id} is updated successfully.` });
    })
    .catch((err) => {
      response.json(err);
    });
};

const concluirTarefa = (request, response) => {
  const { id } = request.params; //pegando o valor do ID mandado na URL
  const { concluido } = request.body; //pegando o valor de "concluido" enviado no Body

  Task.findByIdAndUpdate(id, { $set: { concluido } }) // método que encontra e atualiza por ID
    .then((task) => {
      response
        .status(200)
        .json({ message: `${request.params.id} task is finished.` });
    })
    .catch((err) => {
      response.json(err);
    });
};

const deletarTarefa = (request, response) => {
  const { id } = request.params;

  Task.findByIdAndDelete(id) // o método encontra e deleta a task por ID
    .then(() => {
      response.status(200).json("task deleted");
    })
    .catch((err) => {
      throw new Error(err); // throw new Error => mostra o erro
    });
};

module.exports = {
  getAll,
  criarTarefa,
  deletarTarefa,
  atualizarTarefa,
  concluirTarefa,
};
