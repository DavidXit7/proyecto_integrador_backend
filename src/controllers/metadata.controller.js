import { getCiudades, getGeneros } from "../models/metadata.model.js";

const getAllCiudades = async (req, res) => {
    const ciudades = await getCiudades();
    res.status(200).json(ciudades);
}

const getAllGeneros = async (req, res) => {
    const generos = await getGeneros();
    res.status(200).json(generos);
}

export { getAllCiudades, getAllGeneros }

