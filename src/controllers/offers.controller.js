import Offers from '../models/offers.model.js'
import jwt from 'jsonwebtoken'
import { entityFormatted } from '../utilities/entityFormatted.js'

const offers = new Offers()

export const getOffers = async (req, res) => {
  const [allOffers] = await offers.getOffers()

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      res.json(entityFormatted({
        entity: allOffers,
        output: 'plural',
        isEnableable: true,
      }))
    }
  })
}

export const getOffersByPublicationId = async (req, res) => {
  const { publication_id } = req.params
  const [offersByPublicationId] = await offers.getOffersByPublicationId(publication_id)

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      res.json(entityFormatted({
        entity: offersByPublicationId,
        output: 'plural',
        isEnableable: true,
      }))
    }
  })
}

export const createNewOffer = async (req, res) => {
  try {
    const { body } = req
    await offers.createNewOffer(body)
    res.status(200).send('La oferta se creó satisfactoriamente')
  } catch (error) {
    res.sendStatus(500)
  }
}

export const acceptOffer = (req, res) => {
  try {
    const { offerId } = req.body
    offers.acceptOffer(offerId)
    res.status(200).send('La oferta fue aceptada')
  } catch (error) {
    res.sendStatus(500)
  }
}

export const rejectOffer = async (req, res) => {
  try {
    const { offerId } = req.body
    await offers.rejectOffer(offerId)
    res.status(200).send('La oferta fue rechazada')
  } catch (error) {
    res.sendStatus(500)
  }
}
