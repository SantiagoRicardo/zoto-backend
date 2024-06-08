import Objects from '../models/objects.model.js'
import jwt from 'jsonwebtoken'
import { entityFormatted } from '../utilities/entityFormatted.js'

const objects = new Objects()

export const getObjects = async (req, res) => {
  const [allObjects] = await objects.getObjects()

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      res.json(entityFormatted({
        entity: allObjects,
        output: 'plural',
        isEnableable: true,
      }))
    }
  })
}

export const getObjectById = async (req, res) => {
  const { id } = req.params
  const [ object ] = await objects.getObjectById(id)

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      res.json(entityFormatted({
        entity: object,
        output: 'singular',
        token: null,
        isEnableable: false,
      }))
    }
  })
}

export const createNewObject = async (req, res) => {
  try {
    const { body } = req
    const [ newObject ] = await objects.createNewObject(body)
    const response = { objectId: newObject.insertId}
    res.status(200).json(response)
  } catch (error) {
    res.sendStatus(500)
  }
}

export const deleteObject = async (req, res) => {  
  try {
    const { id } = req.params
    await objects.deleteObject(id)
    res.status(200).send('El objeto se ha eliminado correctamente')  
  } catch (error) {
    res.sendStatus(500)
  }
}
