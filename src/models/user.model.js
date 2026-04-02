import pool from '../config/db.js'

const getAll = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios')
    return rows
  } catch (error) { return [] }
}

const getById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id])
    return rows[0] || null
  } catch (error) { return null }
}

const create = async (documento, nombre, genero_id, ciudad_id, correo) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO usuarios (documento, nombre, genero_id, ciudad_id, correo) VALUES (?, ?, ?, ?, ?)',
      [documento, nombre, genero_id, ciudad_id, correo]
    )
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [result.insertId])
    return rows[0]
  } catch (error) { return null }
}

const update = async (id, documento, nombre, genero_id, ciudad_id, correo) => {
  try {
    const [result] = await pool.query(
      'UPDATE usuarios SET documento = ?, nombre = ?, genero_id = ?, ciudad_id = ?, correo = ? WHERE id = ?',
      [documento, nombre, genero_id, ciudad_id, correo, id]
    )
    if (result.affectedRows === 0) return null
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id])
    return rows[0]
  } catch (error) { return null }
}

const destroy = async (id) => {
  try {
    const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id])
    return result.affectedRows > 0
  } catch (error) { return false }
}

export { getAll, getById, create, update, destroy }
