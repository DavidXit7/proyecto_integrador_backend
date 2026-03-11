import express from 'express'
import { getTasks, getTaskById, getTasksByUser, createTask, updateTask, deleteTask } from '../controllers/tasks.controller.js'

const taskRouter = express.Router()

taskRouter.get('/', getTasks)
taskRouter.get('/user/:userId', getTasksByUser)
taskRouter.get('/:id', getTaskById)
taskRouter.post('/', createTask)
taskRouter.put('/:id', updateTask)
taskRouter.delete('/:id', deleteTask)

export default taskRouter