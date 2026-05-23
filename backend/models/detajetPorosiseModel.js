import pool from '../config/db.js';

export const getAllDetajet = async () => {
  const [rows] = await pool.query(`
    SELECT d.*, p.emri as produkt_emri, o.tavolina_id
    FROM detajet_porosise d
    JOIN produktet p ON d.produkt_id = p.produkt_id
    JOIN porosite o ON d.porosi_id = o.porosi_id
  `);
  return rows;
};

export const getDetajetByPorosi = async (porosi_id) => {
  const [rows] = await pool.query(`
    SELECT d.*, p.emri as produkt_emri
    FROM detajet_porosise d
    JOIN produktet p ON d.produkt_id = p.produkt_id
    WHERE d.porosi_id = ?
  `, [porosi_id]);
  return rows;
};

export const createDetal = async ({ porosi_id, produkt_id, sasia, cmimi_njesi, cmimi_total, shenimet }) => {
  const [result] = await pool.query(
    'INSERT INTO detajet_porosise (porosi_id, produkt_id, sasia, cmimi_njesi, cmimi_total, shenimet) VALUES (?, ?, ?, ?, ?, ?)',
    [porosi_id, produkt_id, sasia, cmimi_njesi, cmimi_total, shenimet]
  );
  return { id: result.insertId };
};

export const updateDetal = async (id, { porosi_id, produkt_id, sasia, cmimi_njesi, cmimi_total, shenimet }) => {
  await pool.query(
    'UPDATE detajet_porosise SET porosi_id=?, produkt_id=?, sasia=?, cmimi_njesi=?, cmimi_total=?, shenimet=? WHERE detal_id=?',
    [porosi_id, produkt_id, sasia, cmimi_njesi, cmimi_total, shenimet, id]
  );
  return { id };
};

export const deleteDetal = async (id) => {
  await pool.query('DELETE FROM detajet_porosise WHERE detal_id = ?', [id]);
};