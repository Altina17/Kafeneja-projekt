import pool from '../config/db.js';

export const getAllLlojet = async () => {
  const [rows] = await pool.query('SELECT * FROM llojet_produkteve');
  return rows;
};