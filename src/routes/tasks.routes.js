import express from 'express'
import { getTasks, getTaskById, getTasksByUser, createTask, updateTask, deleteTask, updateTaskStatus } from '../controllers/tasks.controller.js'

const taskRouter = express.Router()

taskRouter.get('/', getTasks)
taskRouter.get('/user/:documento', getTasksByUser) // Usamos el documento en lugar de userId
taskRouter.get('/:id', getTaskById)
taskRouter.post('/', createTask)
taskRouter.post('/status', updateTaskStatus) // Nuevo endpoint para estado independiente
taskRouter.put('/:id', updateTask)
taskRouter.delete('/:id', deleteTask)

export default taskRouter