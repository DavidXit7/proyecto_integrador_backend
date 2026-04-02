import pool from '../config/db.js'

const getCiudades = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, ciudad FROM ciudades')
    res.status(200).json(rows)
  } catch (error) {
    res.status(500).json({ msn: 'Error al obtener ciudades', error: error.message })
  }
}

const getGeneros = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, genero FROM generos')
    res.status(200).json(rows)
  } catch (error) {
    res.status(500).json({ msn: 'Error al obtener generos', error: error.message })
  }
}

export { getCiudades, getGeneros }
