const express = require("express")
const router = express.Router()

const controller = require("../controllers/toDoController")

//@route GET Tasks
//@desc Return all tasks
//@acces Public
//@endpoint http://localhost:port/tarefas
router.get("/", controller.getAll)

//@route GET Tasks
//@desc Return finished tasks
//@acces Public
//@endpoint http://localhost:port/tarefas/concluidas
router.get("/concluidas", controller.getConcluida)

//@route GET Tasks
//@desc Return unfinished tasks
//@acces Public
//@endpoint http://localhost:port/tarefas/naoconcluidas
router.get("/naoconcluidas", controller.getNaoConcluida)

//@route GET Tasks
//@desc Return a task by id
//@acces Public
//@endpoint http://localhost:port/tarefas/:id
router.get("/:id", controller.getById)

//@route POST Tasks
//@desc Create a task
//@acces Public
//@endpoint http://localhost:port/tarefas/cadastro
router.post("/cadastro", controller.criarTarefa)

//@route PUT Tasks
//@desc Update a task
//@acces Public
//@endpoint http://localhost:port/tarefas/editar/:id
router.put("/editar/:id", controller.atualizarTarefa)

//@route PATCH Tasks
//@desc Update task's status
//@acces Public
//@endpoint http://localhost:port/tarefas/naoconcluidas/:id
router.patch("/naoconcluidas/:id", controller.concluirTarefa)

//@route PATCH Tasks
//@desc Update task collaborator
//@acces Public
//@endpoint http://localhost:port/tarefas/naoconcluidas/colaborador/:id
router.patch("/naoconcluidas/colaborador/:id", controller.atualizarColaborador)

//@route DELETE Tasks
//@desc Delete a task
//@acces Public
//@endpoint http://localhost:port/tarefas/:id
router.delete("/:id", controller.deletarTarefa)

module.exports = router