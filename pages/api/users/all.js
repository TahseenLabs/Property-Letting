import db from '@/lib/db';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session || session.user.role !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  try {
    const [users] = await db.execute('SELECT user_id, username, role FROM users');
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
}
