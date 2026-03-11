import express from 'express'
import { getUsers, getuserById, createUser, updateUser, deleteUser } from '../controllers/users.controller.js'

const userRouter = express.Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', getuserById)
userRouter.post('/', createUser)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)

export default userRouter