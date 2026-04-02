import express from 'express'
import { getCiudades, getGeneros } from '../controllers/catalogs.controller.js'

const catalogRouter = express.Router()

catalogRouter.get('/ciudades', getCiudades)
catalogRouter.get('/generos', getGeneros)

export default catalogRouter
