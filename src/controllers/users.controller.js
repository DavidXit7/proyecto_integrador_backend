import { getAll, getById, create, update, destroy } from "../models/user.model.js"

const getUsers = (req, res) => {
  const users = getAll()
  res.status(200).json({ msn: "lista de usuarios", data: users })
}

const getuserById = (req, res) => {
  const { id } = req.params
  const user = getById(id)
  if (!user) return res.status(404).json({ msn: `Usuario con id: ${id} no encontrado`, data: [] })
  res.status(200).json({ msn: `Usuario con id: ${id} consultado correctamente`, data: user })
}

const createUser = (req, res) => {
  const { name, email, phone } = req.body
  if (!name || !email) return res.status(400).json({ msn: "name y email son obligatorios", data: [] })
  const user = create(name, email, phone)
  res.status(201).json({ msn: "Usuario creado correctamente", data: user })
}

const updateUser = (req, res) => {
  const { id } = req.params
  const { name, email, phone } = req.body
  const user = update(id, name, email, phone)
  if (!user) return res.status(404).json({ msn: `Usuario con id: ${id} no encontrado`, data: [] })
  res.status(200).json({ msn: `Usuario con id: ${id} modificado correctamente`, data: user })
}

const deleteUser = (req, res) => {
  const { id } = req.params
  if (destroy(id)) {
    res.status(200).json({ msn: `Usuario con id: ${id} eliminado correctamente`, data: [{ id }] })
  } else {
    res.status(404).json({ msn: `Usuario con id: ${id} no encontrado`, data: [] })
  }
}

export { getUsers, getuserById, createUser, updateUser, deleteUser }