import { pool } from '../db.js'

class Objects {
  getObjects = () => {
    return pool.query('SELECT * FROM objects')
  }

  getObjectById = (id) => {
    return pool.query('SELECT * FROM objects WHERE id = ?', [id])
  }

  createNewObject = (newObject) => {
    const { userId, objectName, objectImage, quantity } = newObject
    return pool.query(
      'INSERT INTO objects (user_id, object_name, object_image, quantity) VALUES (?, ?, ?, ?)',
      [ userId, objectName, objectImage, quantity ]
    )
  }

  deleteObject = (id) => {
    return pool.query('DELETE FROM objects WHERE id = ?', [id])
  }
}

export default Objects
