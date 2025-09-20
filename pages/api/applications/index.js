import db from '@/lib/db';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const session = await getSession({ req });

    if (!session || session.user.role !== 'tenant') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { property_id } = req.body;
    const tenant_id = session.user.id;

    try {
      const [result] = await db.execute(
        'INSERT INTO applications (tenant_id, property_id, status) VALUES (?, ?, ?)',
        [tenant_id, property_id, 'pending']
      );
      res.status(200).json({ message: 'Application submitted', applicationId: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to submit application' });
    }
  } else if (req.method === 'GET') {
    // Handling GET request to fetch tenant applications
    const session = await getSession({ req });
    console.log(session);  // debugging 

    if (!session || session.user.role !== 'tenant') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const tenant_id = session.user.id;

    try {
      const [applications] = await db.execute(
        'SELECT a.application_id, a.status, p.title, p.price, p.address FROM applications a JOIN properties p ON a.property_id = p.property_id WHERE a.tenant_id = ?',
        [tenant_id]
      );
      res.status(200).json({ applications });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch applications' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
