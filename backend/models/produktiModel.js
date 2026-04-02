import pool from '../config/db.js';

export const getAllProducts = async () => {
  const [rows] = await pool.query('SELECT * FROM produktet');
  return rows;
};

export const getProductById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM produktet WHERE produkt_id = ?', [id]
  );
  return rows[0];
};

export const createProduct = async ({ emri, kategoria_id, pershkrimi, cmimi, statusi, foto }) => {
  const [result] = await pool.query(
    'INSERT INTO produktet (emri, kategoria_id, pershkrimi, cmimi, statusi, foto) VALUES (?, ?, ?, ?, ?, ?)',
    [emri, kategoria_id, pershkrimi, cmimi, statusi, foto]
  );
  return { id: result.insertId, emri, cmimi };
};

export const updateProduct = async (id, { emri, kategoria_id, pershkrimi, cmimi, statusi, foto }) => {
  await pool.query(
    'UPDATE produktet SET emri=?, kategoria_id=?, pershkrimi=?, cmimi=?, statusi=?, foto=? WHERE produkt_id=?',
    [emri, kategoria_id, pershkrimi, cmimi, statusi, foto, id]
  );
  return { id, emri, cmimi };
};

export const deleteProduct = async (id) => {
  await pool.query('DELETE FROM produktet WHERE produkt_id = ?', [id]);
};