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

export const createInventari = async ({ emri_artikullit, njesia_matese, sasia_aktuale, sasia_minimale, furnitor_id, cmimi }) => {
  const [result] = await pool.query(
    'INSERT INTO inventari (emri_artikullit, njesia_matese, sasia_aktuale, sasia_minimale, furnitor_id, cmimi) VALUES (?, ?, ?, ?, ?, ?)',
    [emri_artikullit, njesia_matese, sasia_aktuale, sasia_minimale, furnitor_id, cmimi]
  );
  return { id: result.insertId, emri_artikullit };
};

export const updateInventari = async (id, { emri_artikullit, njesia_matese, sasia_aktuale, sasia_minimale, furnitor_id, cmimi }) => {
  await pool.query(
    'UPDATE inventari SET emri_artikullit=?, njesia_matese=?, sasia_aktuale=?, sasia_minimale=?, furnitor_id=?, cmimi=? WHERE inventar_id=?',
    [emri_artikullit, njesia_matese, sasia_aktuale, sasia_minimale, furnitor_id, cmimi, id]
  );
  return { id, emri_artikullit };
};

export const deleteInventari = async (id) => {
  await pool.query('DELETE FROM inventari WHERE inventar_id = ?', [id]);
};