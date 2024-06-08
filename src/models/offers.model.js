import { pool } from '../db.js'

class Offers {
  getOffers = () => {
    return pool.query(
      'SELECT o.id, o.publication_id, p.user_id AS user_publicator_id, o.user_offering_id, u.user_name AS user_offering, u.phone AS contact_phone, o.offer_description, o.offer_state, o.enabled FROM offers AS o LEFT JOIN publications AS p ON o.publication_id = p.id LEFT JOIN users AS u ON o.user_offering_id = u.id'
    )
  }

  getOffersByPublicationId = (publicationId) => {
    const findOptions = ["pending", "accepted"]

    return pool.query(
      'SELECT o.id, o.publication_id, p.user_id AS user_publicator_id, o.user_offering_id, u.user_name AS user_offering, u.phone AS contact_phone, o.offer_description, o.offer_state, o.enabled FROM offers AS o LEFT JOIN publications AS p ON o.publication_id = p.id LEFT JOIN users AS u ON o.user_offering_id = u.id WHERE o.offer_state IN (?) AND o.publication_id = ?',
      [findOptions, publicationId]
    )
  }

  createNewOffer = (newOffer) => {
    const { publicationId, userOfferingId, offerDescription } = newOffer
    return pool.query(
      'INSERT INTO offers (publication_id, user_offering_id, offer_description) VALUES (?, ?, ?)',
      [ publicationId, userOfferingId, offerDescription ]
    )
  }

  acceptOffer = async (offerId) => {
    const [[{ publication_id }]] = await pool.query('SELECT publication_id FROM offers WHERE id = ?', [offerId])
    const [offersIds] = await pool.query('SELECT id FROM offers WHERE publication_id = ? AND id != ?', [publication_id, offerId])
    const formatIds = offersIds.map((item) => item.id)

    await pool.query('UPDATE offers SET offer_state = "rejected" WHERE id IN (?)', [formatIds])
    await pool.query('UPDATE offers SET offer_state = "accepted" WHERE id = ?', [offerId])
  }

  rejectOffer = (offerId) => {
    return pool.query('UPDATE offers SET offer_state = "rejected" WHERE id = ?', [offerId])
  }
}

export default Offers
