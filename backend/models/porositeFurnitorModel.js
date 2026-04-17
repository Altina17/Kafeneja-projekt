import pool from '../config/db.js';

export const getAllPorositeFurnitor = async () => {
  const [rows] = await pool.query('SELECT * FROM porosite_furnitoreve');
  return rows;
};

export const getPorositeFurnitorById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM porosite_furnitoreve WHERE porosi_furn_id = ?', [id]
  );
  return rows[0];
};

export const createPorositeFurnitor = async ({ furnitor_id, data_porosise, shuma_totale, statusi, data_pranimit }) => {
  const [result] = await pool.query(
    'INSERT INTO porosite_furnitoreve (furnitor_id, data_porosise, shuma_totale, statusi, data_pranimit) VALUES (?, ?, ?, ?, ?)',
    [furnitor_id, data_porosise, shuma_totale, statusi, data_pranimit]
  );
  return { id: result.insertId, furnitor_id };
};

export const updatePorositeFurnitor = async (id, { furnitor_id, data_porosise, shuma_totale, statusi, data_pranimit }) => {
  await pool.query(
    'UPDATE porosite_furnitoreve SET furnitor_id=?, data_porosise=?, shuma_totale=?, statusi=?, data_pranimit=? WHERE porosi_furn_id=?',
    [furnitor_id, data_porosise, shuma_totale, statusi, data_pranimit, id]
  );
  return { id, furnitor_id };
};

export const deletePorositeFurnitor = async (id) => {
  await pool.query('DELETE FROM porosite_furnitoreve WHERE porosi_furn_id = ?', [id]);
};