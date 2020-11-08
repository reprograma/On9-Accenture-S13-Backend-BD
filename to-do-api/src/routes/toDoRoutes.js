const express = require('express');
const router = express.Router();

const taskController = require('../controllers/toDoController');

//@desc GET -  trazer todas as tarefas no banco
router.get('/', taskController.getAll);
//@desc GET -  trazer todas as tarefas no banco pelo id
router.get('/:id', taskController.getByID);
//@desc GET -  trazer todas as tarefas no banco com o status concluído
router.get('/concluida', taskController.getDone);
//@desc GET -  trazer todas as tarefas no banco com o status não concluído
router.get('/naoconcluidas', taskController.getNotDone);


//@desc POST - Criar tarefa
router.post('/cadastro', taskController.createTarefa)
//@desc PUT atualiza os dados
router.put('/editar/:id', taskController.updateTarefa)
//@desc PATCH atualiza o colaborador 
router.patch('/naoconcluidas/colaborador/:id', taskController.updateColaborador)
//@desc PATCH Atualiza o status para completado
router.patch('/naoconcluidas/:id', taskController.completeTarefa)
//@desc DELETE
router.delete('/:id', taskController.deleteTarefa)

module.exports = router;