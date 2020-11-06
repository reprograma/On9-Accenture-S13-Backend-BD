const tasksModels = require('../models/tasks.json');
//const { response, request } = require('express')
const mongoose = require('mongoose');
const Task = require('../models/Tarefas');

/*   GET   */
const getAllTasks = function (request, response) {
    Task.find()
        .then((tasks) => {response.status(200).json(tasks)})
        .catch(err => next(err));
}
const getFinishedTasks = (request, response) => {
    Task.find({ concluido: true })
        .then((tasks) => { response.status(200).json(tasks) })
        .catch(err => next(err));
}
const getUnfinishedTasks = (request, response) => {
    Task.find({ concluido: false })
        .then((tasks) => { response.status(200).json(tasks) })
        .catch(err => next(err));
}
const getByID = (request, response) => {
    const { id } = request.params;
    Task.findById(id)
        .then((task) => { response.status(200).json(task) })
        .catch(err => next(err));
}

/*   POST   */
const createTask = (request, response) => {
    const { descricao, nomeColaborador } = request.body;
    const newTask = new Task({
        descricao: descricao,
        nomeColaborador: nomeColaborador
    })
    newTask.save()
        .then((res) => {
            response.status(201).json(res);
        })
        .catch(err => next(err))

}

/*   PUT   */
const updateTask = (request, response) => {
    const { id } = request.params;
    let teste = false;

    //Verificando se o id é valido 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Task.findById(id)
        .then((task) => {
            if (task.concluido === false) {
                Task.findByIdAndUpdate(id, request.body)
                    .then(() => { response.status(200).json(`${request.params.id} was sucessfully updated`) })
                    .catch((err) => next(err))
            } else {
                response.status(400).json({ message: `You cannot update tasks that have been already finished` })
            }
        })
        .catch((err) => next(err))

}

/*  PATCH  */
const finishTask = (request, response) => {
    const { id } = request.params;
    const { concluido } = request.body;


    Task.findById(id)
        .then((task) => {
            if (!task.concluido) {
                Task.findByIdAndUpdate(id, { $set: { concluido: concluido } })
                    .then(() => { response.status(200).json({ message: `${request.params.id} is finished` }) })
            } else {
                response.status(400).json({ message: `This task has been already finished` })
            }
        })
        .catch((err) => response.status(400).json({ message: `This id's task was not found in our database ${err}` }))


}
const updateColaborator = (request, response) => {
    const { id } = request.params;
    const { nomeColaborador } = request.body;
    Task.findById(id)
        .then((task) => {
            if (!task.concluido) {
                Task.findByIdAndUpdate(id, { $set: { nomeColaborador: nomeColaborador } })
                    .then(() => { response.status(200).json({ message: `The task's field 'nomeColaborador' was sucessfully updated` }) })
                    .catch((err) => next(err))
            } else {
                response.status(400).json({ message: `You cannot update fields of tasks that have been already finished` })
            }
        })
        .catch(err => { throw new Errow(err) })

}

const deleteTask = (request, response) => {
    const { id } = request.params;
    Task.findById(id)
        .then((task) => {
            if (!task.concluido) {
                Task.findByIdAndDelete(id)
                    .then(() => { response.status(200).json({ message: `The task (id: ${id}) was sucessfully deleted` }) })
                    .catch((err) => next(err))
            } else {
                response.status(400).json({ message: `You cannot delete tasks that have been already finished` })
            }
        })
        .catch(err => { throw new Errow(err) })
}

module.exports = {
    getAllTasks,
    getFinishedTasks,
    getUnfinishedTasks,
    getByID,
    createTask,
    updateTask,
    finishTask,
    updateColaborator,
    deleteTask

}