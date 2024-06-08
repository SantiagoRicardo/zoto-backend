import { pool } from '../db.js'

class Publications {
  getPublications = () => {
    return pool.query(
      'SELECT p.id AS publication_id, p.user_id, p.object_id, p.publication_description, p.transaction_type, p.cost, p.create_date, o.object_name, o.object_image, o.quantity, p.enabled FROM publications AS p LEFT JOIN objects AS o ON p.object_id = o.id'
    )
  }

  getPublicationsByUser = (userId) => {
    return pool.query(
      'SELECT p.id AS publication_id, p.user_id, p.object_id, p.publication_description, p.transaction_type, p.cost, p.create_date, o.object_name, o.object_image, o.quantity, p.enabled FROM publications AS p LEFT JOIN objects AS o ON p.object_id = o.id WHERE p.user_id = ?',
      [userId]
    )
  }

  getPublicationById = (id) => {
    return pool.query('SELECT * FROM publications WHERE id = ?', [id])
  }

  createNewPublication = (newPublication) => {
    const { userId, objectId, publicationDescription, transactionType, cost, createDate } = newPublication
    return pool.query(
      'INSERT INTO publications (user_id, object_id, publication_description, transaction_type, cost, create_date) VALUES (?, ?, ?, ?, ?, ?)',
      [ userId, objectId, publicationDescription, transactionType, cost, createDate ]
    )
  }

  deletePublication = (id) => {
    return pool.query('DELETE FROM publications WHERE id = ?', [id])
  }
}

export default Publications
