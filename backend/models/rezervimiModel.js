import pool from '../config/db.js';

export const getAllRezervimet = async () => {
  const [rows] = await pool.query('SELECT * FROM rezervimet');
  return rows;
};

export const getRezervimById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM rezervimet WHERE rezervim_id = ?', [id]
  );
  return rows[0];
};

export const createRezervim = async ({ emri_klientit, telefoni, tavolina_id, data, ora, numri_personave, statusi }) => {
  const [existing] = await pool.query(
    `SELECT * FROM rezervimet 
     WHERE tavolina_id = ? AND data = ? 
     AND ABS(TIMESTAMPDIFF(MINUTE, TIME(ora), TIME(?))) < 60
     AND statusi != 'anuluar'`,
    [tavolina_id, data, ora]
  );
  if (existing.length > 0) throw new Error('Tavolina është e rezervuar për këtë interval kohor (±1 orë)');

  const [result] = await pool.query(
    'INSERT INTO rezervimet (emri_klientit, telefoni, tavolina_id, data, ora, numri_personave, statusi) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [emri_klientit, telefoni, tavolina_id, data, ora, numri_personave, statusi]
  );
  return { id: result.insertId, emri_klientit };
};

export const updateRezervim = async (id, { emri_klientit, telefoni, tavolina_id, data, ora, numri_personave, statusi }) => {
  await pool.query(
    'UPDATE rezervimet SET emri_klientit=?, telefoni=?, tavolina_id=?, data=?, ora=?, numri_personave=?, statusi=? WHERE rezervim_id=?',
    [emri_klientit, telefoni, tavolina_id, data, ora, numri_personave, statusi, id]
  );
  return { id, emri_klientit };
};

export const deleteRezervim = async (id) => {
  await pool.query('DELETE FROM rezervimet WHERE rezervim_id = ?', [id]);
};

export const getTavolinatEZena = async (data, ora) => {
  const [rows] = await pool.query(
    `SELECT tavolina_id FROM rezervimet 
     WHERE data = ? 
     AND ABS(TIMESTAMPDIFF(MINUTE, TIME(ora), TIME(?))) < 60
     AND statusi != 'anuluar'`,
    [data, ora]
  );
  return rows.map(r => r.tavolina_id);
};