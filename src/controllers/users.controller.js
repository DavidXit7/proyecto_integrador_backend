import { getAll, getById, create, update, destroy } from "../models/user.model.js"

const getUsers = async (req, res) => {
  const users = await getAll()
  res.status(200).json(users)
}

const getuserById = async (req, res) => {
  const { id } = req.params
  const user = await getById(id)
  if (!user) return res.status(404).json({ msn: `Usuario con id: ${id} no encontrado`, data: [] })
  res.status(200).json(user)
}

const createUser = async (req, res) => {
  const { documento, nombre, correo, genero_id, ciudad_id } = req.body
  if (!documento || !nombre || !correo || !genero_id || !ciudad_id) {
    return res.status(400).json({ msn: "Todos los campos son obligatorios", data: [] })
  }
  const user = await create(documento, nombre, correo, genero_id, ciudad_id)
  if (!user) return res.status(500).json({ msn: "Error al crear el usuario", data: [] })
  res.status(201).json(user)
}

const updateUser = async (req, res) => {
  const { id } = req.params
  const { documento, nombre, correo, genero_id, ciudad_id } = req.body
  const user = await update(id, documento, nombre, correo, genero_id, ciudad_id)
  if (!user) return res.status(404).json({ msn: `Usuario con id: ${id} no encontrado`, data: [] })
  res.status(200).json(user)
}

const deleteUser = async (req, res) => {
  const { id } = req.params
  if (await destroy(id)) {
    res.status(200).json({ msn: `Usuario con id: ${id} eliminado correctamente`, data: [{ id }] })
  } else {
    res.status(404).json({ msn: `Usuario con id: ${id} no encontrado`, data: [] })
  }
}

export { getUsers, getuserById, createUser, updateUser, deleteUser }

