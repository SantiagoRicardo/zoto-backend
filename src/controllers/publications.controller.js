import Publications from '../models/publications.model.js'
import jwt from 'jsonwebtoken'
import { entityFormatted } from '../utilities/entityFormatted.js'

const publications = new Publications()

export const getPublications = async (req, res) => {
  const [allPublications] = await publications.getPublications()

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      res.json(entityFormatted({
        entity: allPublications,
        output: 'plural',
        isEnableable: true,
      }))
    }
  })
}

export const getPublicationsByUser = async (req, res) => {
  const { id } = req.params
  const [ publicationsByUser ] = await publications.getPublicationsByUser(id)

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      res.json(entityFormatted({
        entity: publicationsByUser,
        output: 'plural',
        isEnableable: true,
      }))
    }
  })
}

export const getPublicationById = async (req, res) => {
  const { id } = req.params
  const [ publication ] = await publications.getPublicationById(id)

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      res.json(entityFormatted({
        entity: publication,
        output: 'singular',
        token: null,
        isEnableable: true,
      }))
    }
  })
}

export const createNewPublication = async (req, res) => {
  try {
    const { body } = req
    const currentDate = new Date()
    body.createDate = currentDate
    await publications.createNewPublication(body)
    res.status(200).send('La publicación se creó satisfactoriamente')
  } catch (error) {
    res.sendStatus(500)
  }
}

export const deletePublication = async (req, res) => {  
  try {
    const { id } = req.params
    await publications.deletePublication(id)
    res.status(200).send('La publicación se ha eliminado correctamente')  
  } catch (error) {
    res.sendStatus(500)
  }
}
