import { pool } from '../db.js'

class Users {
  getUsers = () => {
    return pool.query('SELECT * FROM users')
  }

  getUserById = (id) => {
    return pool.query('SELECT * FROM users WHERE id = ?', [id])
  }

  createNewUser = (newUser) => {
    const { userName, adress, phone, email, userPassword } = newUser
    return pool.query(
      'INSERT INTO users (user_name, adress, phone, email, user_password) VALUES (?, ?, ?, ?, ?)',
      [userName, adress, phone, email, userPassword]
    )
  }

  updatePassword = (id, newPassword) => {
    return pool.query('UPDATE users SET user_password = ? WHERE id = ?', [newPassword, id])
  }

  loginUser = (user) => {
    const { email, userPassword } = user
    return pool.query('SELECT * FROM users WHERE user_password = ? AND email = ?', [userPassword, email])
  }

  verifyEmail = (email) => {
    return pool.query('SELECT id, user_name, email FROM users WHERE email = ?', [email])
  }
}

export default Users
