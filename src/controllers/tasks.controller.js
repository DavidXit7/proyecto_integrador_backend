import { getAll, getById, getByUserId, create, update, destroy } from "../models/task.model.js"

const getTasks = (req, res) => {
  const tasks = getAll()
  res.status(200).json({ msn: "lista de tareas", data: tasks })
}

const getTaskById = (req, res) => {
  const { id } = req.params
  const task = getById(id)
  if (!task) return res.status(404).json({ msn: `Tarea con id: ${id} no encontrada`, data: [] })
  res.status(200).json({ msn: `Tarea con id: ${id} consultada correctamente`, data: task })
}

const getTasksByUser = (req, res) => {
  const { userId } = req.params
  const tasks = getByUserId(userId)
  res.status(200).json({ msn: `Tareas del usuario con id: ${userId}`, data: tasks })
}

const createTask = (req, res) => {
  const { title, description, status, userId } = req.body
  if (!title || !userId) return res.status(400).json({ msn: "title y userId son obligatorios", data: [] })
  const task = create(title, description, status, userId)
  if (!task) return res.status(400).json({ msn: "Estado inválido: pending | in-progress | completed", data: [] })
  res.status(201).json({ msn: "Tarea creada correctamente", data: task })
}

const updateTask = (req, res) => {
  const { id } = req.params
  const { title, description, status, userId } = req.body
  const task = update(id, title, description, status, userId)
  if (!task) return res.status(404).json({ msn: `Tarea con id: ${id} no encontrada o estado inválido`, data: [] })
  res.status(200).json({ msn: `Tarea con id: ${id} modificada correctamente`, data: task })
}

const deleteTask = (req, res) => {
  const { id } = req.params
  if (destroy(id)) {
    res.status(200).json({ msn: `Tarea con id: ${id} eliminada correctamente`, data: [{ id }] })
  } else {
    res.status(404).json({ msn: `Tarea con id: ${id} no encontrada`, data: [] })
  }
}

export { getTasks, getTaskById, getTasksByUser, createTask, updateTask, deleteTask }