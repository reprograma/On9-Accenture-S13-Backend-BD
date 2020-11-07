const express = require("express")
const app = express()

// Configuração do mongoose. ToDoList será o nome da base de dados.
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ToDoList', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const index = require("./routes/index")
const toDoRotas = require("./routes/toDoRoutes")

app.use(express.json())

app.use("/", index)
app.use("/tarefas", toDoRotas)

module.exports = app