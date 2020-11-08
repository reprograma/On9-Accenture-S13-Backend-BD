const express = require("express")
//const app = require("../app")
const router = express.Router()

const tarefasController = require("../controllers/toDoController")

//@route GET Tasks
//@desc Return all tasks
//@acces Public
//@endpoint http://localhost:port/tarefas
router.get("/", tarefasController.getAll)

//@route GET Tasks
//@desc Return finished tasks
//@acces Public
//@endpoint http://localhost:port/tarefas/concluidas
router.get("/concluidas", tarefasController.getConcluida)

//@route GET Tasks
//@desc Return unfinished tasks
//@acces Public
//@endpoint http://localhost:port/tarefas/naoconcluidas
router.get("/naoconcluidas", tarefasController.getNaoConcluida)


//@route GET Tasks
//@desc Return a task by id
//@acces Public
//@endpoint http://localhost:port/tarefas/:id
router.get("/:id", tarefasController.getById)

//@route POST Tasks
//@desc Create a task
//@acces Public
//@endpoint http://localhost:port/tarefas/cadastro
router.post("/cadastro", tarefasController.createTarefa)

//@route PUT Tasks
//@desc Update a task
//@acces Public
//@endpoint http://localhost:port/tarefas/editar/:id
router.put("/editar/:id", tarefasController.putTarefa)

//@route PATCH Tasks
//@desc Update task's status
//@acces Public
//@endpoint http://localhost:port/tarefas/naoconcluidas/:id
router.patch("/naoconcluidas/:id", tarefasController.concluirTarefa)

//@route PATCH Tasks
//@desc Update task collaborator
//@acces Public
//@endpoint http://localhost:port/tarefas/naoconcluidas/colaborador/:id
router.patch("/naoconcluidas/colaborador/:id", tarefasController.atualizarColaborador)

//@route DELETE Tasks
//@desc Delete a task
//@acces Public
//@endpoint http://localhost:port/tarefas/:id
router.delete("/:id", tarefasController.deleteTarefa)

module.exports = router