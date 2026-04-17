import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const [existing] = await pool.query(
      'SELECT * FROM users WHERE email = ?', [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email ekziston tashmë' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );

    res.status(201).json({ message: 'Useri u krijua me sukses', id: result.insertId });

  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await pool.query(
      'SELECT * FROM users WHERE email = ?', [email]
    );

    if (users.length === 0) {
      return res.status(400).json({ message: 'Email ose password i gabuar' });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Email ose password i gabuar' });
    }

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
    );

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await pool.query(
      'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)',
      [user.id, refreshToken, expiresAt]
    );

    res.status(200).json({
      accessToken,
      refreshToken,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });

  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token mungon' });
    }

    const [tokens] = await pool.query(
      'SELECT * FROM refresh_tokens WHERE token = ?', [refreshToken]
    );

    if (tokens.length === 0) {
      return res.status(403).json({ message: 'Refresh token i pavlefshëm' });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const accessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({ accessToken });

  } catch (error) {
    res.status(403).json({ message: 'Refresh token i pavlefshëm', error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    await pool.query(
      'DELETE FROM refresh_tokens WHERE token = ?', [refreshToken]
    );

    res.status(200).json({ message: 'Logout me sukses' });

  } catch (error) {
    res.status(500).json({ message: 'Gabim në server', error: error.message });
  }
};