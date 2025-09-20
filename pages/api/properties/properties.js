import db from '../../../lib/db';

export default async function handler(req, res) {
  try {
    const { method } = req;

    if (method === 'GET') {
      // Fetching all of properties
      const [rows] = await db.query('SELECT * FROM properties');
      
      res.status(200).json({ properties: rows });

    } else if (method === 'POST') {
      const { title, description, price, location, landlord_id } = req.body;

      // Validation
      if (!title || !description || !price || !location || !landlord_id) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const [result] = await db.query(
        'INSERT INTO properties (title, description, price, location, landlord_id) VALUES (?, ?, ?, ?, ?)',
        [title, description, price, location, landlord_id]
      );

      res.status(201).json({ message: 'Property added', propertyId: result.insertId });

    } else if (method === 'PUT') {
      // Handling updating a property
      const { property_id, title, description, price, location } = req.body;

      // Validation
      if (!property_id || !title || !description || !price || !location) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      await db.query(
        'UPDATE properties SET title = ?, description = ?, price = ?, location = ? WHERE property_id = ?',
        [title, description, price, location, property_id]
      );

      res.status(200).json({ message: 'Property updated' });

    } else if (method === 'DELETE') {
      // Handling deleting a property
      const { property_id } = req.query;

      if (!property_id) {
        return res.status(400).json({ message: 'Property ID is required' });
      }

      await db.query('DELETE FROM properties WHERE property_id = ?', [property_id]);
      res.status(200).json({ message: 'Property deleted' });

    } else {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
    }

  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
