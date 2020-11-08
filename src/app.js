const express = require("express")
const app = express()

//configuaracao do mongoose - O "ToDoList" eh o nome da base de dados
const mongose = require('mongoose')
mongose.connect('mongodb://localhost/TodoList', {
    useNewUrlParser: true,
    useUnifiedTopology:true
})

const index = require("./routes/index")
const toDoRoutes = require("./routes/toDoRoutes")


app.use(express.json())
app.use("/", index)
app.use("/tarefas", toDoRoutes)


module.exports = app 