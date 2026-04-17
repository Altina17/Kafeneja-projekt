import pool from '../config/db.js';

export const getAllTurnet = async () => {
  const [rows] = await pool.query('SELECT * FROM turnet');
  return rows;
};

export const getTurniById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM turnet WHERE turn_id = ?', [id]
  );
  return rows[0];
};

export const createTurni = async ({ punetor_id, data, ora_fillimit, ora_perfundimit, shenimet }) => {
  const [result] = await pool.query(
    'INSERT INTO turnet (punetor_id, data, ora_fillimit, ora_perfundimit, shenimet) VALUES (?, ?, ?, ?, ?)',
    [punetor_id, data, ora_fillimit, ora_perfundimit, shenimet]
  );
  return { id: result.insertId, punetor_id };
};

export const updateTurni = async (id, { punetor_id, data, ora_fillimit, ora_perfundimit, shenimet }) => {
  await pool.query(
    'UPDATE turnet SET punetor_id=?, data=?, ora_fillimit=?, ora_perfundimit=?, shenimet=? WHERE turn_id=?',
    [punetor_id, data, ora_fillimit, ora_perfundimit, shenimet, id]
  );
  return { id, punetor_id };
};

export const deleteTurni = async (id) => {
  await pool.query('DELETE FROM turnet WHERE turn_id = ?', [id]);
};