import pool from '../config/db.js'

const getAll = async () => {
  try {
    const [tareas] = await pool.query('SELECT * FROM tareas')
    for (const tarea of tareas) {
      const [usuarios] = await pool.query(
        `SELECT u.documento FROM usuarios u
         JOIN tarea_usuario tu ON tu.usuario_id = u.id
         WHERE tu.tarea_id = ?`,
        [tarea.id]
      )
      tarea.usuarios_asignados = usuarios.map(u => u.documento)
    }
    return tareas
  } catch (error) { return [] }
}

const getById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tareas WHERE id = ?', [id])
    if (!rows[0]) return null
    const tarea = rows[0]
    const [usuarios] = await pool.query(
      `SELECT u.documento FROM usuarios u
       JOIN tarea_usuario tu ON tu.usuario_id = u.id
       WHERE tu.tarea_id = ?`,
      [tarea.id]
    )
    tarea.usuarios_asignados = usuarios.map(u => u.documento)
    return tarea
  } catch (error) { return null }
}

const getByUserId = async (userId) => {
  try {
    const [rows] = await pool.query(
      `SELECT t.* FROM tareas t
       JOIN tarea_usuario tu ON tu.tarea_id = t.id
       WHERE tu.usuario_id = ?`,
      [userId]
    )
    return rows
  } catch (error) { return [] }
}

const create = async (titulo, descripcion, estado = 'pendiente', usuarios_asignados = []) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO tareas (titulo, descripcion, estado) VALUES (?, ?, ?)',
      [titulo, descripcion, estado]
    )
    const tareaId = result.insertId

    // Asignar usuarios por documento
    for (const documento of usuarios_asignados) {
      const [usuarios] = await pool.query('SELECT id FROM usuarios WHERE documento = ?', [documento])
      if (usuarios[0]) {
        await pool.query('INSERT INTO tarea_usuario (tarea_id, usuario_id) VALUES (?, ?)', [tareaId, usuarios[0].id])
      }
    }

    return await getById(tareaId)
  } catch (error) { return null }
}

const update = async (id, titulo, descripcion, estado, usuarios_asignados = []) => {
  try {
    const [result] = await pool.query(
      'UPDATE tareas SET titulo = ?, descripcion = ?, estado = ? WHERE id = ?',
      [titulo, descripcion, estado, id]
    )
    if (result.affectedRows === 0) return null

    // Reemplazar usuarios asignados
    await pool.query('DELETE FROM tarea_usuario WHERE tarea_id = ?', [id])
    for (const documento of usuarios_asignados) {
      const [usuarios] = await pool.query('SELECT id FROM usuarios WHERE documento = ?', [documento])
      if (usuarios[0]) {
        await pool.query('INSERT INTO tarea_usuario (tarea_id, usuario_id) VALUES (?, ?)', [id, usuarios[0].id])
      }
    }

    return await getById(id)
  } catch (error) { return null }
}

const destroy = async (id) => {
  try {
    const [result] = await pool.query('DELETE FROM tareas WHERE id = ?', [id])
    return result.affectedRows > 0
  } catch (error) { return false }
}

export { getAll, getById, getByUserId, create, update, destroy }
