import { getAll, getById, getByUserId, create, update, destroy, updateAssignmentStatus } from "../models/task.model.js"

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
    const { documento } = req.params
    const tasks = await getByUserId(documento)
    res.status(200).json(tasks)
}

const createTask = async (req, res) => {
  const { titulo, descripcion, usuarios_asignados } = req.body
  if (!titulo) return res.status(400).json({ msn: "titulo es obligatorio", data: [] })
  const task = await create(titulo, descripcion, usuarios_asignados || [])
  if (!task) return res.status(500).json({ msn: "Error al crear la tarea", data: [] })
  res.status(201).json(task)
}

const updateTask = async (req, res) => {
  const { id } = req.params
  const { titulo, descripcion, usuarios_asignados } = req.body
  const task = await update(id, titulo, descripcion, usuarios_asignados || [])
  if (!task) return res.status(404).json({ msn: `Tarea con id: ${id} no encontrada`, data: [] })
  res.status(200).json(task)
}

const updateTaskStatus = async (req, res) => {
    const { idTarea, documentoUsuario, estado } = req.body
    if (!idTarea || !documentoUsuario || !estado) {
        return res.status(400).json({ msn: "Faltan datos obligatorios", data: [] })
    }
    const success = await updateAssignmentStatus(idTarea, documentoUsuario, estado)
    if (!success) return res.status(404).json({ msn: "No se pudo actualizar el estado", data: [] })
    res.status(200).json({ msn: "Estado actualizado correctamente", data: [{ idTarea, documentoUsuario, estado }] })
}

const deleteTask = async (req, res) => {
  const { id } = req.params
  try {
    if (await destroy(id)) {
      res.status(200).json({ msn: `Tarea con id: ${id} eliminada correctamente`, data: [{ id }] })
    } else {
      res.status(404).json({ msn: `Tarea con id: ${id} no encontrada`, data: [] })
    }
  } catch (error) {
    // Capturamos el error de seguridad estricta
    if (error.code === "HAS_ASSIGNMENTS") {
      return res.status(400).json({ 
        msn: error.message, 
        data: [] 
      })
    }
    console.error("Error en el controlador al eliminar tarea:", error)
    res.status(500).json({ msn: "Error interno del servidor", data: [] })
  }
}

export { getTasks, getTaskById, getTasksByUser, createTask, updateTask, deleteTask, updateTaskStatus }

