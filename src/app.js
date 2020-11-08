const express = require("express")
const app = express()

const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/ToDoList', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const toDoRotas = require("./routes/toDoRoutes")

app.use(express.json())

app.use("/tarefas", toDoRotas)

module.exports = app