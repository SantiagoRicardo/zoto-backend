import { Router } from 'express'

import { requestHasToken } from '../utilities/authorization.js'
import { createNewObject, deleteObject, getObjectById, getObjects } from '../controllers/objects.controller.js'

export const objectsRouter = Router()

objectsRouter.get('/objects', requestHasToken, getObjects)
objectsRouter.get('/objects/:id', requestHasToken, getObjectById)
objectsRouter.post('/objects', requestHasToken, createNewObject)
objectsRouter.delete('/objects/:id', deleteObject)
