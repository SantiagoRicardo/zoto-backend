import { Router } from 'express'

import { usersRouter } from './users.router.js'
import { objectsRouter } from './objects.router.js'
import { publicationsRouter } from './publications.router.js'
import { offersRouter } from './offers.router.js'

export const routers = Router()

routers.use(usersRouter)
routers.use(objectsRouter)
routers.use(publicationsRouter)
routers.use(offersRouter)
