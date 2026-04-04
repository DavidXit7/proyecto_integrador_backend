import pool from '../config/db.js'

const getAll = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE activo = 1')
    return rows
  } catch (error) { return [] }
}

const getById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ? AND activo = 1', [id])
    return rows[0] || null
  } catch (error) { return null }
}

const create = async (documento, nombre, correo, genero_id, ciudad_id) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO usuarios (documento, nombre, correo, genero_id, ciudad_id) VALUES (?, ?, ?, ?, ?)',
      [documento, nombre, correo, genero_id, ciudad_id]
    )
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [result.insertId])
    return rows[0]
  } catch (error) { return null }
}

const update = async (id, documento, nombre, correo, genero_id, ciudad_id) => {
  try {
    const [result] = await pool.query(
      'UPDATE usuarios SET documento = ?, nombre = ?, correo = ?, genero_id = ?, ciudad_id = ? WHERE id = ?',
      [documento, nombre, correo, genero_id, ciudad_id, id]
    )
    if (result.affectedRows === 0) return null
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id])
    return rows[0]
  } catch (error) { return null }
}

const destroy = async (id) => {
  try {
    const [result] = await pool.query('UPDATE usuarios SET activo = 0 WHERE id = ?', [id])
    return result.affectedRows > 0
  } catch (error) { return false }
}

export { getAll, getById, create, update, destroy }
