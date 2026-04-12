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
    // 1. Verificamos si el usuario tiene tareas PENDIENTES en tareas ACTIVAS
    const [asignaciones] = await pool.query(
      `SELECT COUNT(*) as total 
       FROM tarea_usuario tu
       JOIN tareas t ON t.id = tu.tarea_id
       WHERE tu.usuario_id = ? AND tu.estado = 'pendiente' AND t.activo = 1`, 
      [id]
    )
    
    if (asignaciones[0].total > 0) {
      // Bloqueamos el borrado solo si tiene trabajo activo pendiente
      const error = new Error("No se puede eliminar el usuario: Todavía tiene tareas con estado 'pendiente'. Termínalas o desvincúlalo primero.")
      error.code = "HAS_ASSIGNMENTS"
      throw error
    }

    const [result] = await pool.query('UPDATE usuarios SET activo = 0 WHERE id = ?', [id])
    return result.affectedRows > 0
  } catch (error) { 
    if (error.code === "HAS_ASSIGNMENTS") throw error
    console.error("Error al desactivar usuario:", error)
    return false 
  }
}

export { getAll, getById, create, update, destroy }
