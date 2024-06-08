import { Router } from 'express'

import { requestHasToken } from '../utilities/authorization.js'
import {
  createNewPublication,
  deletePublication,
  getPublicationById,
  getPublications,
  getPublicationsByUser,
} from '../controllers/publications.controller.js'

export const publicationsRouter = Router()

publicationsRouter.get('/publications', requestHasToken, getPublications)
publicationsRouter.get('/publications/:id', requestHasToken, getPublicationById)
publicationsRouter.get('/publications_by_user/:id', requestHasToken, getPublicationsByUser)
publicationsRouter.post('/publications', createNewPublication)
publicationsRouter.delete('/publications/:id', requestHasToken, deletePublication)
