import db from '@/lib/db';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session || session.user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  try {
    const [apps] = await db.execute(`
      SELECT a.application_id, a.status, u.username AS tenant_username, p.title AS property_title
      FROM applications a
      JOIN users u ON a.tenant_id = u.user_id
      JOIN properties p ON a.property_id = p.property_id
    `);

    res.status(200).json({ applications: apps });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching applications' });
  }
}
