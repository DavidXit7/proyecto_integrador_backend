import pool from '../config/db.js'

const getCiudades = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM ciudades');
        return rows;
    } catch (error) {
        return [];
    }
}

const getGeneros = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM generos');
        return rows;
    } catch (error) {
        return [];
    }
}

export { getCiudades, getGeneros }
