import pool from '../config/db.js'

const getAll = async () => {
  try {
    const [tareas] = await pool.query('SELECT * FROM tareas WHERE activo = 1')
    for (const tarea of tareas) {
      const [usuarios] = await pool.query(
        `SELECT u.documento, u.nombre, tu.estado FROM usuarios u
         JOIN tarea_usuario tu ON tu.usuario_id = u.id
         WHERE tu.tarea_id = ?`,
        [tarea.id]
      )
      tarea.usuarios_asignados = usuarios
    }
    return tareas
  } catch (error) { 
    console.error("Error en getAll tareas:", error)
    return [] 
  }
}

const getById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tareas WHERE id = ? AND activo = 1', [id])
    if (!rows[0]) return null
    const tarea = rows[0]
    const [usuarios] = await pool.query(
      `SELECT u.documento, u.nombre, tu.estado FROM usuarios u
       JOIN tarea_usuario tu ON tu.usuario_id = u.id
       WHERE tu.tarea_id = ?`,
      [tarea.id]
    )
    tarea.usuarios_asignados = usuarios
    return tarea
  } catch (error) { return null }
}

const getByUserId = async (documento) => {
  try {
    const [rows] = await pool.query(
      `SELECT t.*, tu.estado FROM tareas t
       JOIN tarea_usuario tu ON tu.tarea_id = t.id
       JOIN usuarios u ON u.id = tu.usuario_id
       WHERE u.documento = ? AND u.activo = 1`,
      [documento]
    )
    return rows
  } catch (error) { return [] }
}

const create = async (titulo, descripcion, usuarios_asignados = []) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO tareas (titulo, descripcion) VALUES (?, ?)',
      [titulo, descripcion]
    )
    const tareaId = result.insertId

    for (const documento of usuarios_asignados) {
      const [usuarios] = await pool.query('SELECT id FROM usuarios WHERE documento = ? AND activo = 1', [documento])
      if (usuarios[0]) {
        await pool.query(
          'INSERT INTO tarea_usuario (tarea_id, usuario_id, estado) VALUES (?, ?, ?)', 
          [tareaId, usuarios[0].id, 'pendiente']
        )
      }
    }

    return await getById(tareaId)
  } catch (error) { 
    console.error("Error en create tarea:", error)
    return null 
  }
}

const update = async (id, titulo, descripcion, usuarios_asignados = []) => {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    const [result] = await connection.query(
      'UPDATE tareas SET titulo = ?, descripcion = ? WHERE id = ? AND activo = 1',
      [titulo, descripcion, id]
    )
    if (result.affectedRows === 0) {
      await connection.rollback()
      return null
    }

    const [anteriores] = await connection.query(
      'SELECT u.documento, tu.estado FROM tarea_usuario tu JOIN usuarios u ON u.id = tu.usuario_id WHERE tu.tarea_id = ?', 
      [id]
    )
    const mapaEstados = new Map(anteriores.map(a => [a.documento, a.estado]))

    await connection.query('DELETE FROM tarea_usuario WHERE tarea_id = ?', [id])

    for (const documento of usuarios_asignados) {
      const [usuarios] = await connection.query('SELECT id FROM usuarios WHERE documento = ? AND activo = 1', [documento])
      if (usuarios[0]) {
        const estadoPreservado = mapaEstados.get(documento) || 'pendiente'
        await connection.query(
          'INSERT INTO tarea_usuario (tarea_id, usuario_id, estado) VALUES (?, ?, ?)', 
          [id, usuarios[0].id, estadoPreservado]
        )
      }
    }

    await connection.commit()
    return await getById(id)
  } catch (error) {
    await connection.rollback()
    console.error("Error al actualizar tarea:", error)
    return null
  } finally {
    connection.release()
  }
}

const updateAssignmentStatus = async (idTarea, documentoUsuario, nuevoEstado) => {
  try {
    const [usuarios] = await pool.query('SELECT id FROM usuarios WHERE documento = ?', [documentoUsuario])
    if (!usuarios[0]) return false

    const [result] = await pool.query(
      'UPDATE tarea_usuario SET estado = ? WHERE tarea_id = ? AND usuario_id = ?',
      [nuevoEstado, idTarea, usuarios[0].id]
    )
    return result.affectedRows > 0
  } catch (error) { return false }
}

const destroy = async (id) => {
  try {
    // ---- SEGURIDAD SELECTIVA (Archivado Inteligente) ---- 
    // 1. Verificamos si tiene usuarios en estado PENDIENTE únicamente
    const [asignaciones] = await pool.query(
      'SELECT COUNT(*) as total FROM tarea_usuario WHERE tarea_id = ? AND estado = "pendiente"', 
      [id]
    )
    
    if (asignaciones[0].total > 0) {
      // Bloqueamos el borrado solo si hay trabajo activo (pendiente)
      const error = new Error("No se puede eliminar la tarea: Todavía tiene usuarios en estado 'pendiente'. Termínala o desvincúlalos primero.")
      error.code = "HAS_ASSIGNMENTS"
      throw error
    }

    // AHORA ES SOFT DELETE (Borrado Lógico / Archivado)
    const [result] = await pool.query('UPDATE tareas SET activo = 0 WHERE id = ?', [id])
    return result.affectedRows > 0
  } catch (error) { 
    if (error.code === "HAS_ASSIGNMENTS") throw error
    console.error("Error al desactivar tarea (Soft Delete):", error)
    return false 
  }
}

export { getAll, getById, getByUserId, create, update, destroy, updateAssignmentStatus }
