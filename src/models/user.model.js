let users = [
  { id: 1, name: "John Becerra", email: "jfbecerra@sena.edu.co", phone: "3001234567" },
  { id: 2, name: "Marlon Moreno", email: "marlo@sena.edu.co",    phone: "3119876543" }
]
let nextId = 3

const getAll = () => {
  try { return users } catch (error) { return [] }
}

const getById = (id) => {
  try { return users.find(u => u.id === Number(id)) || null } catch (error) { return [] }
}

const create = (name, email, phone) => {
  try {
    const user = { id: nextId++, name, email, phone }
    users.push(user)
    return user
  } catch (error) { return [] }
}

const update = (id, name, email, phone) => {
  try {
    const index = users.findIndex(u => u.id === Number(id))
    if (index === -1) return null
    users[index] = { id: Number(id), name, email, phone }
    return users[index]
  } catch (error) { return [] }
}

const destroy = (id) => {
  try {
    const index = users.findIndex(u => u.id === Number(id))
    if (index === -1) return false
    users.splice(index, 1)
    return true
  } catch (error) { return [] }
}

export { getAll, getById, create, update, destroy }