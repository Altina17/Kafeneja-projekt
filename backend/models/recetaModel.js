import pool from '../config/db.js';

export const getAllReceta = async () => {
  const [rows] = await pool.query(`
    SELECT r.*, p.emri AS emri_produktit, i.emri_artikullit
    FROM receta r
    LEFT JOIN produktet p ON r.produkt_id = p.produkt_id
    LEFT JOIN inventari i ON r.inventar_id = i.inventar_id
  `);
  return rows;
};

export const getRecetaByProduktId = async (produkt_id) => {
  const [rows] = await pool.query(`
    SELECT r.*, i.emri_artikullit, i.njesia_matese
    FROM receta r
    LEFT JOIN inventari i ON r.inventar_id = i.inventar_id
    WHERE r.produkt_id = ?
  `, [produkt_id]);
  return rows;
};

export const getRecetaById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM receta WHERE receta_id = ?', [id]
  );
  return rows[0];
};

export const createReceta = async ({ produkt_id, inventar_id, sasia, njesia }) => {
  const [result] = await pool.query(
    'INSERT INTO receta (produkt_id, inventar_id, sasia, njesia) VALUES (?, ?, ?, ?)',
    [produkt_id, inventar_id, sasia, njesia || null]
  );
  return { id: result.insertId, produkt_id, inventar_id };
};

export const updateReceta = async (id, { produkt_id, inventar_id, sasia, njesia }) => {
  await pool.query(
    'UPDATE receta SET produkt_id=?, inventar_id=?, sasia=?, njesia=? WHERE receta_id=?',
    [produkt_id, inventar_id, sasia, njesia || null, id]
  );
  return { id, produkt_id, inventar_id };
};

export const deleteReceta = async (id) => {
  await pool.query('DELETE FROM receta WHERE receta_id = ?', [id]);
};