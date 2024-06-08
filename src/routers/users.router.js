import { Router } from 'express'

import { requestHasToken } from '../utilities/authorization.js'
import { createNewUser, getUserById, getUsers, loginUser, passwordRecovery, updatePassword } from '../controllers/users.controller.js'

export const usersRouter = Router()

usersRouter.get('/users/password_recovery/:email', passwordRecovery)
usersRouter.get('/users', requestHasToken, getUsers)
usersRouter.get('/users/:id', requestHasToken, getUserById)
usersRouter.post('/users', createNewUser)
usersRouter.post('/users/login', loginUser)
usersRouter.patch('/users/update_password', requestHasToken, updatePassword)
