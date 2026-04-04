import { getAll, getById, getByUserId, create, update, destroy } from "../models/task.model.js"

const getTasks = async (req, res) => {
  const tasks = await getAll()
  res.status(200).json(tasks)
}

const getTaskById = async (req, res) => {
  const { id } = req.params
  const task = await getById(id)
  if (!task) return res.status(404).json({ msn: `Tarea con id: ${id} no encontrada`, data: [] })
  res.status(200).json(task)
}

const getTasksByUser = async (req, res) => {
  const { userId } = req.params
  const tasks = await getByUserId(userId)
  res.status(200).json(tasks)
}

const createTask = async (req, res) => {
  const { titulo, descripcion, estado, usuarios_asignados } = req.body
  if (!titulo) return res.status(400).json({ msn: "titulo es obligatorio", data: [] })
  const task = await create(titulo, descripcion, estado, usuarios_asignados || [])
  if (!task) return res.status(500).json({ msn: "Error al crear la tarea", data: [] })
  res.status(201).json(task)
}

const updateTask = async (req, res) => {
  const { id } = req.params
  const { titulo, descripcion, estado, usuarios_asignados } = req.body
  const task = await update(id, titulo, descripcion, estado, usuarios_asignados || [])
  if (!task) return res.status(404).json({ msn: `Tarea con id: ${id} no encontrada`, data: [] })
  res.status(200).json(task)
}

const deleteTask = async (req, res) => {
  const { id } = req.params
  if (await destroy(id)) {
    res.status(200).json({ msn: `Tarea con id: ${id} eliminada correctamente`, data: [{ id }] })
  } else {
    res.status(404).json({ msn: `Tarea con id: ${id} no encontrada`, data: [] })
  }
}

export { getTasks, getTaskById, getTasksByUser, createTask, updateTask, deleteTask }
