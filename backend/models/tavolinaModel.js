import pool from '../config/db.js';

export const getAllTables = async () => {
  const [rows] = await pool.query('SELECT * FROM tavolinat');
  return rows;
};

export const getTableById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM tavolinat WHERE tavolina_id = ?', [id]
  );
  return rows[0];
};

export const createTable = async ({ numri, kapaciteti, vendndodhja, statusi }) => {
  const [result] = await pool.query(
    'INSERT INTO tavolinat (numri, kapaciteti, vendndodhja, statusi) VALUES (?, ?, ?, ?)',
    [numri, kapaciteti, vendndodhja, statusi]
  );
  return { id: result.insertId, numri, kapaciteti, vendndodhja, statusi };
};

export const updateTable = async (id, { numri, kapaciteti, vendndodhja, statusi }) => {
  await pool.query(
    'UPDATE tavolinat SET numri=?, kapaciteti=?, vendndodhja=?, statusi=? WHERE tavolina_id=?',
    [numri, kapaciteti, vendndodhja, statusi, id]
  );
  return { id, numri, kapaciteti, vendndodhja, statusi };
};

export const deleteTable = async (id) => {
  await pool.query('DELETE FROM tavolinat WHERE tavolina_id = ?', [id]);
};