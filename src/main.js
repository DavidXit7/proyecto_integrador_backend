import express from 'express'
import userRouter from './routes/users.routes.js'
import taskRouter from './routes/tasks.routes.js'
import catalogRouter from './routes/catalogs.routes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

// Rutas que espera el frontend
app.use('/usuarios', userRouter)
app.use('/tareas', taskRouter)
app.use('/', catalogRouter)

export default app