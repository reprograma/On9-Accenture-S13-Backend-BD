const express = require("express")
const app = express() 

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ToDoList", //ToDoList= database name
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

const taskRoutes = require("./routes/taskRoutes")

app.use(express.json())
app.use("/tasks", taskRoutes)

module.exports = app