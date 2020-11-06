const express = require('express');
const app = express();

//Configuração da nossa conexão com a nossa base de dados
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ToDoList',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

const toDoRoutes = require('./routes/toDoRoutes');

app.use(express.json());
app.use('/tarefas', toDoRoutes);

module.exports = app;
