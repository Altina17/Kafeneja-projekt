import pool from '../config/db.js';

export const getAllInventari = async () => {
  const [rows] = await pool.query('SELECT * FROM inventari');
  return rows;
};

export const getInventariById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM inventari WHERE inventar_id = ?', [id]
  );
  return rows[0];
};

export const createInventari = async ({ emri, sasia, njesia }) => {
  const [result] = await pool.query(
    'INSERT INTO inventari (emri, sasia, njesia) VALUES (?, ?, ?)',
    [emri, sasia, njesia]
  );
  return { id: result.insertId, emri };
};

export const updateInventari = async (id, { emri, sasia, njesia }) => {
  await pool.query(
    'UPDATE inventari SET emri=?, sasia=?, njesia=? WHERE inventar_id=?',
    [emri, sasia, njesia, id]
  );
  return { id, emri };
};

export const deleteInventari = async (id) => {
  await pool.query('DELETE FROM inventari WHERE inventar_id = ?', [id]);
};