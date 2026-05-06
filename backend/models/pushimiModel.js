import pool from '../config/db.js';

export const getAllPushimet = async () => {
  const [rows] = await pool.query(`
    SELECT l.*, p.emri, p.mbiemri
    FROM lejet l
    LEFT JOIN punetoret p ON l.punetor_id = p.punetor_id
  `);
  return rows;
};

export const getPushimiById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM lejet WHERE leja_id = ?', [id]
  );
  return rows[0];
};

export const createPushimi = async ({ punetor_id, data_fillimit, data_mbarimit, lloji, statusi, arsyeja }) => {
  const [result] = await pool.query(
    'INSERT INTO lejet (punetor_id, data_fillimit, data_mbarimit, lloji, statusi, arsyeja) VALUES (?, ?, ?, ?, ?, ?)',
    [punetor_id, data_fillimit, data_mbarimit, lloji, statusi, arsyeja || null]
  );
  return { id: result.insertId, punetor_id };
};

export const updatePushimi = async (id, { punetor_id, data_fillimit, data_mbarimit, lloji, statusi, arsyeja }) => {
  await pool.query(
    'UPDATE lejet SET punetor_id=?, data_fillimit=?, data_mbarimit=?, lloji=?, statusi=?, arsyeja=? WHERE leja_id=?',
    [punetor_id, data_fillimit, data_mbarimit, lloji, statusi, arsyeja || null, id]
  );
  return { id, punetor_id };
};

export const deletePushimi = async (id) => {
  await pool.query('DELETE FROM lejet WHERE leja_id = ?', [id]);
};