import pool from '../config/db.js';

export const getAllCategories = async () => {
  const [rows] = await pool.query('SELECT * FROM kategorite');
  return rows;
};

export const getCategoryById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM kategorite WHERE kategori_id = ?', [id]
  );
  return rows[0];
};

export const createCategory = async ({ emri, pershkrimi }) => {
  const [result] = await pool.query(
    'INSERT INTO kategorite (emri, pershkrimi) VALUES (?, ?)',
    [emri, pershkrimi]
  );
  return { id: result.insertId, emri, pershkrimi };
};

export const updateCategory = async (id, { emri, pershkrimi }) => {
  await pool.query(
    'UPDATE kategorite SET emri=?, pershkrimi=? WHERE kategori_id=?',
    [emri, pershkrimi, id]
  );
  return { id, emri, pershkrimi };
};

export const deleteCategory = async (id) => {
  await pool.query('DELETE FROM kategorite WHERE kategori_id = ?', [id]);
};