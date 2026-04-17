import pool from '../config/db.js';

export const getAllFurnitoret = async () => {
  const [rows] = await pool.query('SELECT * FROM furnitoret');
  return rows;
};

export const getFurnitorById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM furnitoret WHERE furnitor_id = ?', [id]
  );
  return rows[0];
};

export const createFurnitor = async ({ emri, personi_kontaktit, telefoni, email, adresa, lloji_produkteve }) => {
  const [result] = await pool.query(
    'INSERT INTO furnitoret (emri, personi_kontaktit, telefoni, email, adresa, lloji_produkteve) VALUES (?, ?, ?, ?, ?, ?)',
    [emri, personi_kontaktit, telefoni, email, adresa, lloji_produkteve]
  );
  return { id: result.insertId, emri };
};

export const updateFurnitor = async (id, { emri, personi_kontaktit, telefoni, email, adresa, lloji_produkteve }) => {
  await pool.query(
    'UPDATE furnitoret SET emri=?, personi_kontaktit=?, telefoni=?, email=?, adresa=?, lloji_produkteve=? WHERE furnitor_id=?',
    [emri, personi_kontaktit, telefoni, email, adresa, lloji_produkteve, id]
  );
  return { id, emri };
};

export const deleteFurnitor = async (id) => {
  await pool.query('DELETE FROM furnitoret WHERE furnitor_id = ?', [id]);
};