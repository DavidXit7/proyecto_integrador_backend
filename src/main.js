import express from 'express'
import userRouter from './routes/users.routes.js'
import taskRouter from './routes/tasks.routes.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

app.use('/users', userRouter)
app.use('/tasks', taskRouter)

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})