import express from 'express'
import cors from 'cors'
import userRouter from './routes/users.routes.js'
import taskRouter from './routes/tasks.routes.js'
import { getAllCiudades, getAllGeneros } from './controllers/metadata.controller.js'

const app = express()

app.use(cors()) // Habilita CORS para todas las rutas
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rutas que espera el frontend
app.use('/usuarios', userRouter)
app.use('/tareas', taskRouter)
app.get('/ciudades', getAllCiudades)
app.get('/generos', getAllGeneros)

export default app
