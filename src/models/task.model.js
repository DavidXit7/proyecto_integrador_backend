const VALID_STATUSES = ['pending', 'in-progress', 'completed']

let tasks = [
  { id: 1, title: "Configurar servidor", description: "Instalar Express",   status: "completed",   userId: 1 },
  { id: 2, title: "Crear rutas",         description: "Definir rutas REST", status: "in-progress", userId: 1 },
  { id: 3, title: "Diseñar modelos",     description: "Modelar entidades",  status: "pending",     userId: 2 }
]
let nextId = 4

const getAll = () => {
  try { return tasks } catch (error) { return [] }
}

const getById = (id) => {
  try { return tasks.find(t => t.id === Number(id)) || null } catch (error) { return [] }
}

const getByUserId = (userId) => {
  try { return tasks.filter(t => t.userId === Number(userId)) } catch (error) { return [] }
}

const create = (title, description, status = 'pending', userId) => {
  try {
    if (!VALID_STATUSES.includes(status)) return null
    const task = { id: nextId++, title, description, status, userId: Number(userId) }
    tasks.push(task)
    return task
  } catch (error) { return [] }
}

const update = (id, title, description, status, userId) => {
  try {
    const index = tasks.findIndex(t => t.id === Number(id))
    if (index === -1) return null
    if (status && !VALID_STATUSES.includes(status)) return null
    tasks[index] = { id: Number(id), title, description, status, userId: Number(userId) }
    return tasks[index]
  } catch (error) { return [] }
}

const destroy = (id) => {
  try {
    const index = tasks.findIndex(t => t.id === Number(id))
    if (index === -1) return false
    tasks.splice(index, 1)
    return true
  } catch (error) { return [] }
}

export { getAll, getById, getByUserId, create, update, destroy }