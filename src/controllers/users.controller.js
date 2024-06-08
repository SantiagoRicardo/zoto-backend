import Users from '../models/users.model.js'
import jwt from 'jsonwebtoken'
import { mailer } from '../config.js'
import { entityFormatted } from '../utilities/entityFormatted.js'
import { generatePassword } from '../utilities/generatePassword.js'

const users = new Users()

export const getUsers = async (req, res) => {
  const [ allUsers ] = await users.getUsers()

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      res.json(entityFormatted({
        entity: allUsers,
        output: 'plural',
        isEnableable: true,
      }))
    }
  })
}

export const getUserById = async (req, res) => {
  const { id } = req.params
  const [ user ] = await users.getUserById(id)

  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      res.json(entityFormatted({
        entity: user,
        output: 'singular',
        token: null,
        isEnableable: true,
      }))
    }
  })
}

export const createNewUser = async (req, res) => {
  try {
    const { body } = req
    const [ response ] = await users.createNewUser(body)

    if (response.insertId) {
      const [ newUser ] = await users.getUserById(response.insertId)

      jwt.sign({ newUser }, 'secretkey', (err, token) => {
        res.json(entityFormatted({
          entity: newUser,
          output: 'singular',
          token,
          isEnableable: true,
        }))
      })
    }    
  } catch (error) {
    res.sendStatus(500)
  }
}

export const loginUser = async (req, res) => {
  const { body } = req
  const [ userExists ] = await users.loginUser(body)
  
  if (userExists.length) {
    jwt.sign({ body }, 'secretkey', (err, token) => {
      res.json(entityFormatted({
        entity: userExists,
        output: 'singular',
        token,
        isEnableable: true,
      }))
    })
  } else {
    res.sendStatus(404)
  }
}

export const passwordRecovery = async (req, res) => {
  const { email } = req.params
  const [ [ existsEmail ] ] = await users.verifyEmail(email)

  if (existsEmail && 'email' in existsEmail) {
    const { newPassword } = generatePassword()

    const message = `RECUPERACIÓN DE CONTRASEÑA\n\n\nHola ${existsEmail.user_name}\n\nHas solicitado recuperar tu contraseña.\nPor lo tanto se te asignó la siguiente contraseña temporal ${newPassword}\n\nRecuerda cambiarla tan pronto ingreses a tu cuenta.`

    mailer.sendMail({
      from: 'zotoapptest@gmail.com',
      to: existsEmail.email,
      subject: 'Password-recovery',
      text: message,
    })
      .then(() => {
        return users.updatePassword(existsEmail.id, newPassword)
      })
      .then(() => {
        res.status(200).send(`Se ha enviado un correo con instrucciones a ${existsEmail.email}`)
      })
      .catch(() => {
        res.status(500).send('Ocurrio un error, intenta nuevamente')
      })
  } else {
    res.sendStatus(404)
  }
}

export const updatePassword = async (req, res) => {
  const { id, newPassword } = req.body
  const [ response ] = await users.updatePassword(id, newPassword)

  if (response.affectedRows) {
    res.status(200).send("La contraseña se actualizó correctamente")
  } else {
    res.sendStatus(404)
  }
}
