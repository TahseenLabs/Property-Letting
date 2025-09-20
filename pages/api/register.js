import pool from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [existingUser] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    await pool.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, password, role]
    );

    res.status(200).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}
