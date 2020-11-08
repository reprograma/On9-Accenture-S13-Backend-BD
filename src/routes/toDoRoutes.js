const express = require("express")
const router = express.Router()

const controller = require("../controllers/toDoController")

router.get("/", controller.getAll)

router.get("/:id", controller.getById)

router.get("/concluidas", controller.getCompletedTasks)

router.get("/naoconcluidas", controller.getUncompletedTasks)

router.post("/cadastro", controller.createTask)

router.put("/editar/:id", controller.updateTask)

router.patch("/naoconcluidas/:id", controller.finishTask)

router.patch("/responsavel/:id", controller.updateCollaborator)

router.delete("/:id", controller.deleteTask)

module.exports = router