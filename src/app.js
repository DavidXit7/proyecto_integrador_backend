import express from 'express'
const app = express()
const port = 3000

// mensaje de bienvenida
app.get('/', (req, res) => {
  res.send('<h1>Servidor funcionando correctamente</h1>')
})

// rutas de usuarios
app.get('/users', (req, res) => {
  res.send('<h1>Aquí se listarán los usuarios</h1>')
})

app.post('/users', (req, res) => {
  res.send('<h1>Aquí se creará un usuario</h1>')
})

// rutas de tareas
app.get('/tasks', (req, res) => {
  res.send('<h1>Aquí se listarán las tareas</h1>')
})

app.post('/tasks', (req, res) => {
  res.send('<h1>Aquí se creará una tarea</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})