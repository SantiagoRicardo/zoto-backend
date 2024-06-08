import { Router } from 'express'

import { requestHasToken } from '../utilities/authorization.js'
import { acceptOffer, createNewOffer, getOffers, getOffersByPublicationId, rejectOffer } from '../controllers/offers.controller.js'

export const offersRouter = Router()

offersRouter.post('/offers', requestHasToken, createNewOffer)
offersRouter.get('/offers/:publication_id', requestHasToken, getOffersByPublicationId)
offersRouter.get('/offers', requestHasToken, getOffers)
offersRouter.patch('/offers/accept', requestHasToken, acceptOffer)
offersRouter.patch('/offers/reject', requestHasToken, rejectOffer)
